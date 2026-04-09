export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

interface RazorpayOptions {
  orderId: string;
  amount: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  onSuccess: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => void;
  onFailure: () => void;
}

export const openRazorpayCheckout = async (options: RazorpayOptions) => {
  const loaded = await loadRazorpay();
  if (!loaded) {
    alert('Failed to load Razorpay. Please check your internet connection.');
    return;
  }

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const rzpOptions = {
    key: razorpayKey || 'rzp_test_placeholder',
    amount: options.amount,
    currency: 'INR',
    name: 'Ooorrrzzzaaa',
    description: 'For Your Brighter Health',
    order_id: options.orderId,
    handler: options.onSuccess,
    prefill: {
      name: options.userName,
      email: options.userEmail,
      contact: options.userPhone,
    },
    theme: {
      color: '#E65100',
    },
    modal: {
      ondismiss: options.onFailure,
    },
  };

  const rzp = new (window as any).Razorpay(rzpOptions);
  rzp.open();
};
