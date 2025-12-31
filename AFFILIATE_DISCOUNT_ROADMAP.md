# Affiliate Discount System Roadmap

This roadmap outlines the implementation of a discount code system linked to the existing affiliate management module.

## Goal
Allow users to enter a discount code (which corresponds to an affiliate code) during checkout. If valid, applying the code will update the pricing visually and calculate the correct discounted amount for the payment gateway.

## Implementation Steps

### 1. Database & Admin Updates
- **Objective**: specific table for managing multiple discount codes linked to influencers.
- **Concept**: A separate table allowing one influencer to have many codes (e.g., "ADI364", "SUMMER20").
- **New Table** (`discount_codes`):
    - `id`: uuid (PK).
    - `code`: text (Unique).
    - `influencer_id`: uuid (FK to influencers.id).
    - `discount_percentage`: integer (0-100).
    - `is_active`: boolean.
    - `expires_at`: timestamp (nullable).
    - `created_at`: timestamp.
- **Admin UI** (`AdminInfluencerManagement`):
    - New Tab/Modal: "Manage Discount Codes".
    - List all codes for an influencer.
    - "Add Code" -> Input Code (or auto-use affiliate code), % Discount, Expiry Date.
    - Validation: Check for uniqueness.

### 2. Backend Logic (Validation / Calculation)
- **Endpoint**: `POST /api/tracking/affiliate/validate-coupon`
- **Logic**:
    1.  Look up `affiliate_code` in DB.
    2.  Check if `is_active` is true AND `expires_at` (if set) is in the future.
    3.  **Calculation**:
        - Apply `discount_percentage` to both INR (Razorpay) and USD (PayPal) prices.
        - Example: 20% off. `Price * 0.8`.
    4.  **Return**:
        - `valid: true`
        - `new_amount_inr`: 799
        - `new_amount_usd`: 4
        - `discount_applied`: "20% OFF"

### 3. Payment UI Enhancements
- **Objective**: Allow user input and show visual feedback.
- **UI Component**: `AuthBanner.tsx` (or a triggered modal).
- **Action**:
    - Add "Have a discount code?" button/link near the "Pay" button.
    - On click, show Input Field + "Apply" button.
    - **Animation**: On success, use `framer-motion` to animate the price strikethrough (`<del>₹999</del>`) and show the new price (`₹799`) with a glow effect.
    - **NOTE**: Use **Gemini 2.0 Flash** model for generating this specific UI code.
    - Update the `pricing` state in `QuestResultClient` with the new values.

### 4. Payment Processing & Tracking
- **Processing**:
    - Pass the validated `coupon_code` to the order creation API.
    - Server re-calculates the final price to prevent tampering.
- **Tracking (Database)**:
    - Update `tracking_events` (purchase event) to include:
        - `used_coupon_code`: text (The specific code text entered, e.g., "SUMMER20").
        - `discount_amount`: numeric (The amount saved).
        - `final_paid_amount`: numeric (The amount actually charged).
        - `influencer_id`: uuid (FK to influencers, ensuring credit even if custom code is used).

### 6. Admin Transaction History Enhancements
- **Objective**: Show *who* used which code and the resulting discount details in the Payment Dashboard.
- **Problem**: `transaction_details` has `coupon` and `total_discount` but lacks a link to the influencer.
- **Action**:
    - **Database**: Add `influencer_id` column to `transaction_details` (FK to influencers).
    - **Backend (`GET /api/admin/payments`)**:
        - Join `transaction_details` with `influencers` (via `influencer_id`).
        - Return `influencer_name`.
    - **Frontend (`AdminQuestPayment.tsx`)**:
        - In "View Details", show "Applied Code", "Discount Amount", and "Influencer".

## Verification Plan

### Automated Tests
- Test API `validate-coupon` with valid/invalid codes.

### Manual Verification
1. **Admin**: Set a 20% discount for affiliate `TEST_USER`.
2. **User Flow**:
    - Go to Quest Result.
    - Click "Pay".
    - Enter `TEST_USER` in discount field.
    - Verify price drops by 20% visually.
    - Proceed to Razorpay/PayPal.
    - **Verify**: The amount requested by the gateway matches the discounted price.
    - **Complete Payment**.
    - **Verify**: Affiliate dashboard shows correct commission (based on discounted total).
