import "./ModalPayment.css";
import { AiOutlineClose } from "react-icons/ai";
export default function ModalPayment({ setModalPayment }) {
  return (
    <div className="modal-user">
      <div className="modal-content">
        <div className="modal-header">
          <span>Create Customer</span>
          <button onClick={() => setModalPayment(false)}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-body-row">
            {/* Left */}
            <div className="modal-body-row-left">
              <div className="modal-body-row-left-input">
                <label>Received Amount:</label>
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control"
                />
              </div>
              <div>1</div>

              <div>
              <label>Notes:</label>
                <textarea
                  className="form-control"
                />
              </div>
            </div>
            {/* Right */}
            <div className="modal-body-row-right">
              <div className="custom-cash-card">
                <table>
                  <tbody>
                    <tr>
                      <td>Total Products</td>
                      <td><span className="td-num-color">1</span></td>
                    </tr>
                    <tr>
                      <td>Total Amount</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>Order Tax</td>
                      <td>$ 13.43</td>
                    </tr>
                    <tr>
                      <td>Discount</td>
                      <td>$ 13.43</td>
                    </tr>
                    <tr>
                      <td>Shipping</td>
                      <td>$ 13.43</td>
                    </tr>
                    <tr>
                      <td>Grand Total</td>
                      <td>$ 13.43</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* buttons */}
        <div className="row-form-user-btns modal-footer">
          <button className="btn-primary">
            Save
          </button>
          <button
            className="btn-cancel"
            onClick={() => setModalPayment(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
