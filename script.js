// Espera a que el DOM esté completamente cargado para ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // --- VARIABLES Y SELECTORES GLOBALES ---
    const API_URL = 'https://raw.githubusercontent.com/JUANCITOPENA/Pagina_Vehiculos_Ventas/refs/heads/main/vehiculos.json';
    
    // Contenedores y elementos principales
    const productsContainer = document.getElementById('productsContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const searchInput = document.getElementById('searchInput');
    
    // Carrito
    const cartCount = document.getElementById('cartCount');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Modales (instancias de Bootstrap)
    const quantityModal = new bootstrap.Modal(document.getElementById('quantityModal'));
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));

    // Botones de modales
    const confirmAddToCartBtn = document.getElementById('confirmAddToCartBtn');
    const processPaymentBtn = document.getElementById('processPaymentBtn');
    
    // Almacenamiento de datos
    let vehiclesData = [];
    let cart = [];
    let currentVehicleToAdd = null;


    // --- LÓGICA DE LA APLICACIÓN ---

    /**
     * Carga los datos de los vehículos desde la API usando async/await.
     * Gestiona el estado de carga y los posibles errores.
     */
    const loadVehicles = async () => {
        showSpinner(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            vehiclesData = await response.json();
            displayVehicles(vehiclesData);
        } catch (error) {
            console.error('Error al cargar los vehículos:', error);
            productsContainer.innerHTML = `<div class="col-12 text-center text-danger">
                                              <p>Lo sentimos, no se pudieron cargar los vehículos. Por favor, inténtalo de nuevo más tarde.</p>
                                           </div>`;
        } finally {
            showSpinner(false);
        }
    };

    /**
     * Muestra u oculta el spinner de carga.
     * @param {boolean} show - True para mostrar, false para ocultar.
     */
    const showSpinner = (show) => {
        loadingSpinner.style.display = show ? 'flex' : 'none';
        productsContainer.style.display = show ? 'none' : 'flex';
    };
    
    /**
     * Renderiza las tarjetas de los vehículos en el DOM.
     * @param {Array} vehicles - El array de vehículos a mostrar.
     */
    const displayVehicles = (vehicles) => {
        productsContainer.innerHTML = ''; // Limpiar contenedor
        if (vehicles.length === 0) {
            productsContainer.innerHTML = `<div class="col-12 text-center"><p>No se encontraron vehículos que coincidan con la búsqueda.</p></div>`;
            return;
        }

        vehicles.forEach(vehicle => {
            // Limpiar el campo 'tipo' de emojis
            const vehicleTypeClean = vehicle.tipo.replace(/[\u{1F600}-\u{1F64F}]/gu, '').trim();

            const card = document.createElement('div');
            card.className = 'col-lg-4 col-md-6 mb-4';
            card.innerHTML = `
                <div class="card h-100">
                    <img src="${vehicle.imagen}" class="card-img-top" alt="${vehicle.marca} ${vehicle.modelo}" loading="lazy">
                    <div class="card-body">
                        <h5 class="card-title">${vehicle.marca} ${vehicle.modelo}</h5>
                        <p class="card-text text-muted">${vehicle.categoria} | Año: ${vehicle.año}</p>
                        <p class="card-text"><strong>Tipo:</strong> ${vehicleTypeClean}</p>
                        <h4 class="card-price text-primary mb-3">${formatPrice(vehicle.precio_venta)}</h4>
                        <button class="btn btn-primary w-100 addToCartBtn card-footer-btn" data-codigo="${vehicle.codigo}" aria-label="Añadir ${vehicle.marca} ${vehicle.modelo} al carrito">
                            <i class="fas fa-cart-plus me-2"></i>Añadir al Carrito
                        </button>
                    </div>
                </div>
            `;
            productsContainer.appendChild(card);
        });
        addAddToCartListeners();
    };

    /**
     * Añade listeners a todos los botones "Añadir al Carrito".
     * Usa delegación de eventos para eficiencia.
     */
    const addAddToCartListeners = () => {
        productsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('addToCartBtn') || event.target.closest('.addToCartBtn')) {
                const button = event.target.closest('.addToCartBtn');
                const vehicleCode = parseInt(button.dataset.codigo);
                currentVehicleToAdd = vehiclesData.find(v => v.codigo === vehicleCode);
                if (currentVehicleToAdd) {
                    showQuantityModal();
                }
            }
        });
    };

    /**
     * Muestra el modal para que el usuario seleccione la cantidad.
     */
    const showQuantityModal = () => {
        document.getElementById('quantityInput').value = 1;
        quantityModal.show();
    };

    /**
     * Añade un ítem al carrito o actualiza su cantidad si ya existe.
     * @param {object} vehicle - El objeto del vehículo.
     * @param {number} quantity - La cantidad a añadir.
     */
    const addItemToCart = (vehicle, quantity) => {
        if (quantity <= 0) return;

        const existingItem = cart.find(item => item.codigo === vehicle.codigo);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...vehicle, quantity });
        }
        
        quantityModal.hide();
        updateCartUI();
        // Disparar animación en el contador del carrito
        cartCount.classList.add('pulse');
        setTimeout(() => cartCount.classList.remove('pulse'), 500);
    };

    /**
     * Actualiza toda la interfaz de usuario relacionada con el carrito.
     * (Contador, contenido del modal del carrito, total).
     */
    const updateCartUI = () => {
        // Limpiar contenedor del carrito
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalItems = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center">Tu carrito está vacío.</p>';
            checkoutBtn.disabled = true;
        } else {
            cart.forEach(item => {
                const subtotal = item.precio_venta * item.quantity;
                total += subtotal;
                totalItems += item.quantity;

                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <img src="${item.logo}" class="cart-item-logo" alt="Logo ${item.marca}">
                    <img src="${item.imagen}" class="cart-item-img" alt="${item.marca} ${item.modelo}">
                    <div class="cart-item-details">
                        <strong>${item.marca} ${item.modelo}</strong><br>
                        Cantidad: ${item.quantity} x ${formatPrice(item.precio_venta)}
                    </div>
                    <div class="fw-bold">${formatPrice(subtotal)}</div>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
            checkoutBtn.disabled = false;
        }
        
        // Actualizar contador y total
        cartCount.textContent = totalItems;
        cartTotalSpan.textContent = formatPrice(total);
    };

    /**
     * Filtra los vehículos basados en el texto de búsqueda.
     */
    const filterVehicles = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const filteredVehicles = vehiclesData.filter(vehicle => 
            vehicle.marca.toLowerCase().includes(searchTerm) ||
            vehicle.modelo.toLowerCase().includes(searchTerm) ||
            vehicle.categoria.toLowerCase().includes(searchTerm)
        );
        displayVehicles(filteredVehicles);
    };

    /**
     * Simula el proceso de pago y genera una factura en PDF.
     */
    const processPayment = () => {
        // Validación simple del formulario de pago
        const cardName = document.getElementById('cardName').value;
        const cardNumber = document.getElementById('cardNumber').value;
        if (!cardName || !cardNumber) {
            alert('Por favor, completa los campos del formulario de pago.');
            return;
        }

        alert('¡Pago procesado con éxito! Generando su factura...');

        generateInvoice();

        // Limpiar el carrito y actualizar UI
        cart = [];
        updateCartUI();
        
        // Cerrar modales
        paymentModal.hide();
        cartModal.hide(); // Asegurarse que el del carrito también se cierre
    };

    /**
     * Genera un PDF con los detalles de la compra usando jsPDF.
     */
    const generateInvoice = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const customerName = document.getElementById('cardName').value || "Cliente";
        let y = 20; // Posición vertical inicial

        // Cabecera del PDF
        doc.setFontSize(22);
        doc.text("Factura de Compra - GarageOnline", 105, y, { align: 'center' });
        y += 10;
        doc.setFontSize(12);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, y);
        doc.text(`Cliente: ${customerName}`, 20, y + 7);
        y += 20;
        
        // Cabecera de la tabla
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text("Descripción", 20, y);
        doc.text("Cantidad", 120, y);
        doc.text("Subtotal", 170, y);
        doc.setFont(undefined, 'normal');
        y += 10;
        doc.line(20, y - 5, 190, y - 5); // Línea separadora

        // Items del carrito
        let total = 0;
        cart.forEach(item => {
            const subtotal = item.precio_venta * item.quantity;
            total += subtotal;
            doc.setFontSize(12);
            doc.text(`${item.marca} ${item.modelo}`, 20, y);
            doc.text(item.quantity.toString(), 125, y, { align: 'center' });
            doc.text(formatPrice(subtotal), 185, y, { align: 'right' });
            y += 8;
        });

        // Total
        doc.line(20, y, 190, y);
        y += 10;
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text("Total:", 130, y);
        doc.text(formatPrice(total), 185, y, { align: 'right' });
        
        // Guardar el PDF
        doc.save(`factura-garageonline-${Date.now()}.pdf`);
    };

    /**
     * Formatea un número como moneda (USD en este caso).
     * @param {number} price - El precio a formatear.
     * @returns {string} - El precio formateado.
     */
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(price);
    };

    // --- EVENT LISTENERS ---

    // Filtro de búsqueda en tiempo real
    searchInput.addEventListener('input', filterVehicles);
    
    // Botón para confirmar añadir al carrito (desde el modal de cantidad)
    confirmAddToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('quantityInput').value);
        if (currentVehicleToAdd) {
            addItemToCart(currentVehicleToAdd, quantity);
        }
    });

    // Botón para ir al modal de pago
    checkoutBtn.addEventListener('click', () => {
        cartModal.hide();
        paymentModal.show();
    });

    // Botón para procesar el pago final
    processPaymentBtn.addEventListener('click', processPayment);

    // --- INICIALIZACIÓN ---
    loadVehicles(); // Carga inicial de los datos
    updateCartUI(); // Inicializa la UI del carrito
});