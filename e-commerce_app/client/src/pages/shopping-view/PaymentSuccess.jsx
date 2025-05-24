import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

export default function PaymentSuccess() {
  const {orderDetails} = useSelector(state => state.shopOrder)
  
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Card className="max-w-md w-full space-y-6 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex flex-col items-center">
          <CircleCheckIcon className="text-green-500 h-16 w-16" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-4">Payment Successful</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Thank you for your payment. Your order is being processed.
          </p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Amount Paid:</span>
            <span className="font-medium text-gray-900 dark:text-gray-50">{orderDetails?.totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Payment Method:</span>
            <span className="font-medium text-gray-900 dark:text-gray-50">{orderDetails?.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Date: </span>
            <span className="font-medium text-gray-900 dark:text-gray-50">{orderDetails?.orderDate.split("T")[0]}</span>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300 cursor-pointer"
            onClick={() => { navigate("/shop/account") }}
          >
            View Order History
          </Button>
        </div>
      </Card>
    </div>
  )
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}