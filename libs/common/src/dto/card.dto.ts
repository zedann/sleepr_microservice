import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from "class-validator";
import Stripe from "stripe";

export class cardDto {

@IsString()
@IsNotEmpty()
     cvc: string;

@IsNumber()
@IsNotEmpty()
     exp_month: number;

@IsNumber()
@IsNotEmpty()
     exp_year: number;

@IsString()
    networks: Stripe.PaymentMethod.Card.Networks;


@IsCreditCard()
@IsNotEmpty()
     number: string;

@IsString()
     token: string;
}