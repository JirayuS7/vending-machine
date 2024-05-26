import { Button } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

export default function ConfirmPayment() {
  return (
    <div
      className='text-center'
    >
      <div>
        <CheckCircleOutlined
          className='text-success fs-1'
        />
      </div>

      <div className='py-3'>

        <h3 className='text-success'>Thank You  </h3>
        <p>
          Your payment has been successfully processed.
        </p>
        <h4 className='fs-5'>
          Pick up your order at the counter.
        </h4>
      </div>

      <Button type="primary"
        className='bg-warning border-0 fw-bold'
        onClick={() => { window.location.href = "/"; }}

      >Continue Shopping</Button>
    </div>
  )
}
