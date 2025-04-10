import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckoutPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Address Section */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <RadioGroup defaultValue="1">
              <div className="flex items-center justify-between border p-3 rounded-xl">
                <RadioGroupItem value="1" />
                <div className="ml-3">
                  <p className="font-medium">Adhil Salah</p>
                  <p className="text-sm text-muted-foreground">
                    Kerala, India - 679584
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border p-3 rounded-xl">
                <RadioGroupItem value="2" />
                <div className="ml-3">
                  <p className="font-medium">Faster Dev</p>
                  <p className="text-sm text-muted-foreground">
                    Chennai, India - 600001
                  </p>
                </div>
              </div>
            </RadioGroup>
            <Button variant="outline" className="w-full">
              Add New Address
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Method */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="standard">
            <div className="flex justify-between p-3 border rounded-xl">
              <RadioGroupItem value="standard" />
              <div className="ml-3">
                <p className="font-medium">Standard Delivery</p>
                <p className="text-sm text-muted-foreground">3-5 days</p>
              </div>
              <p className="ml-auto font-medium">Free</p>
            </div>
            <div className="flex justify-between p-3 border rounded-xl">
              <RadioGroupItem value="express" />
              <div className="ml-3">
                <p className="font-medium">Express Delivery</p>
                <p className="text-sm text-muted-foreground">1-2 days</p>
              </div>
              <p className="ml-auto font-medium">₹99</p>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="cod">
            <div className="flex justify-between p-3 border rounded-xl">
              <RadioGroupItem value="cod" />
              <p className="ml-3 font-medium">Cash on Delivery</p>
            </div>
            <div className="flex justify-between p-3 border rounded-xl">
              <RadioGroupItem value="card" />
              <p className="ml-3 font-medium">Credit/Debit Card</p>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹500</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹99</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹45</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-medium">
            <span>Total</span>
            <span>₹644</span>
          </div>
          <Button className="w-full mt-4">Place Order</Button>
        </CardContent>
      </Card>
    </div>
  );
}
