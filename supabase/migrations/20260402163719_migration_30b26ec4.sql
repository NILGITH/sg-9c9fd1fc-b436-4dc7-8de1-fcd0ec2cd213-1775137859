-- Fix: Update payment method constraint to include kkiapay
ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_payment_method_check;
ALTER TABLE payments ADD CONSTRAINT payments_payment_method_check 
  CHECK (payment_method IN ('mobile_money', 'bank_transfer', 'cash', 'kkiapay', 'other'));