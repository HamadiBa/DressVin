from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import stripe
from typing import Optional, List
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration Stripe
stripe.api_key = os.getenv('STRIPE_SECRET_KEY', 'sk_test_your_secret_key')

@app.post("/api/create-checkout-session")
async def create_checkout_session(plan: str = 'premium'):
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'eur',
                    'product_data': {
                        'name': 'Premium Plan',
                        'description': 'Accès aux fonctionnalités premium',
                    },
                    'unit_amount': 999,  # 9.99€ en centimes
                },
                'quantity': 1,
            }],
            mode='subscription',
            success_url='http://localhost:5173/success',
            cancel_url='http://localhost:5173/cancel',
        )
        return {"url": checkout_session.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))