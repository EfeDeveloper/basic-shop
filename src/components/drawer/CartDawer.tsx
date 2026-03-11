import React, { useState } from 'react';
import {
  CheckOutlined,
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Drawer, Result, Spin } from 'antd';
import AppModal from '../ui/AppModal';
import { useCartStore } from '../../stores/cartStore';
import { currencyFormatter, fechaYHoraActual } from '../../utils';

type SummaryStep = 'summary' | 'processing' | 'success';

const PAYMENT_DELAY_MS = 2500;
const SUCCESS_DISPLAY_MS = 2800;

function generateOrderId(): string {
  return `Luma-${Date.now().toString(36).toUpperCase()}`;
}

const CartDrawer = () => {
  const {
    items: allProducts,
    totalValue,
    countProducts,
    isDrawerOpen,
    toggleDrawer,
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    emptyCart,
    createOrderExport,
  } = useCartStore();
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [summaryStep, setSummaryStep] = useState<SummaryStep>('summary');
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleCloseSummary = () => {
    setSummaryOpen(false);
    setSummaryStep('summary');
    setOrderId(null);
  };

  const handleProceedToPay = () => {
    setSummaryStep('processing');
    setTimeout(() => {
      createOrderExport();
      emptyCart();
      setOrderId(generateOrderId());
      setSummaryStep('success');
      setTimeout(handleCloseSummary, SUCCESS_DISPLAY_MS);
    }, PAYMENT_DELAY_MS);
  };

  return (
    <>
    <Drawer
      title={
        <span className="cart-drawer-title">
          Tu carrito
          {allProducts.length > 0 && (
            <span className="app-drawer-subtitle">
              {countProducts} {countProducts === 1 ? 'producto' : 'productos'}
            </span>
          )}
        </span>
      }
      placement="right"
      onClose={toggleDrawer}
      open={isDrawerOpen}
      width={380}
      className="cart-drawer app-drawer"
    >
      {allProducts.length > 0 ? (
        <>
          <div className="cart-drawer-list">
            {allProducts.map((item) => (
              <div key={item.id} className="cart-drawer-item">
                <Avatar src={item.urlImage} shape="square" className="cart-drawer-item-img" />
                <div className="cart-drawer-item-body">
                  <div className="cart-drawer-item-name">{item.name}</div>
                  <div className="cart-drawer-item-price">
                    {currencyFormatter({ currency: 'COP', value: item.unit_price })}
                  </div>
                  <div className="cart-drawer-item-actions">
                    <div className="cart-drawer-qty">
                      <Button
                        type="text"
                        size="small"
                        icon={<MinusOutlined />}
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.initialQuantity <= 1}
                        aria-label="Restar una unidad"
                      />
                      <span className="cart-drawer-qty-num">{item.initialQuantity}</span>
                      <Button
                        type="text"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => increaseQuantity(item.id)}
                        aria-label="Sumar una unidad"
                      />
                    </div>
                    <Button
                      type="text"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => removeProduct(item)}
                      aria-label="Quitar del carrito"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total-box">
            <div className="cart-total-label">Total a pagar</div>
            <div className="cart-total-amount">
              {currencyFormatter({ currency: 'COP', value: totalValue })}
            </div>
          </div>
          <div className="cart-drawer-actions">
            <Button
              block
              type="primary"
              size="large"
              icon={<CheckOutlined />}
              onClick={() => {
                setSummaryOpen(true);
                toggleDrawer();
              }}
              className="cart-btn-order"
            >
              Ver resumen y pagar
            </Button>
            <Button
              block
              size="middle"
              icon={<DeleteOutlined />}
              onClick={emptyCart}
              className="cart-btn-empty"
            >
              Vaciar carrito
            </Button>
          </div>
        </>
      ) : (
        <Result
          className="cart-empty-state"
          status="info"
          icon={<ShoppingOutlined style={{ fontSize: 48, color: 'var(--color-text-secondary)' }} />}
          title="Tu carrito está vacío"
          subTitle="Añade productos desde el catálogo"
        />
      )}
    </Drawer>

    <AppModal
      title={summaryStep === 'summary' ? 'Resumen del pedido' : summaryStep === 'processing' ? 'Procesando pago' : '¡Pedido realizado!'}
      open={summaryOpen}
      onCancel={summaryStep === 'summary' ? handleCloseSummary : undefined}
      footer={null}
      width={520}
      closable={summaryStep === 'summary'}
      className="order-summary-modal"
    >
      {summaryStep === 'summary' && (
        <div className="order-summary-content">
          <section className="order-summary-block">
            <h3 className="order-summary-block-title">Artículos en tu pedido</h3>
            <div className="order-summary-list">
              {allProducts.map((item) => (
                <div key={item.id} className="order-summary-row">
                  <Avatar src={item.urlImage} shape="square" className="order-summary-row-img" />
                  <div className="order-summary-row-main">
                    <span className="order-summary-name">{item.name}</span>
                    <span className="order-summary-meta">
                      Cantidad: {item.initialQuantity} · {currencyFormatter({ currency: 'COP', value: item.unit_price })} c/u
                    </span>
                  </div>
                  <div className="order-summary-row-total">
                    {currencyFormatter({ currency: 'COP', value: item.unit_price * item.initialQuantity })}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="order-summary-block">
            <h3 className="order-summary-block-title">Resumen de pago</h3>
            <div className="order-summary-payment-rows">
              <div className="order-summary-payment-row">
                <span>Subtotal ({countProducts} {countProducts === 1 ? 'artículo' : 'artículos'})</span>
                <span>{currencyFormatter({ currency: 'COP', value: totalValue })}</span>
              </div>
              <div className="order-summary-payment-row order-summary-payment-total">
                <span>Total</span>
                <strong>{currencyFormatter({ currency: 'COP', value: totalValue })}</strong>
              </div>
            </div>
            <div className="order-summary-date">
              Fecha del pedido: {fechaYHoraActual()}
            </div>
          </section>
          <div className="order-summary-actions">
            <Button onClick={handleCloseSummary} className="order-summary-btn-cancel">
              Cancelar
            </Button>
            <Button type="primary" icon={<CreditCardOutlined />} onClick={handleProceedToPay} className="order-summary-btn-proceed">
              Proceder a pagar
            </Button>
          </div>
        </div>
      )}
      {summaryStep === 'processing' && (
        <div className="order-summary-processing">
          <Spin size="large" />
          <p className="order-summary-processing-text">Procesando tu pago de forma segura...</p>
          <p className="order-summary-processing-sub">No cierres esta ventana</p>
        </div>
      )}
      {summaryStep === 'success' && orderId && (
        <div className="order-summary-success">
          <Result
            status="success"
            icon={<CheckOutlined style={{ color: 'var(--color-primary)', fontSize: 72 }} />}
            title="¡Gracias por tu compra!"
            subTitle={
              <>
                <span className="order-summary-success-id">Número de pedido: <strong>{orderId}</strong></span>
                <br />
                <span>Tu factura se ha descargado. Revisa tu bandeja de descargas.</span>
              </>
            }
          />
        </div>
      )}
    </AppModal>
    </>
  );
};

export default CartDrawer;
