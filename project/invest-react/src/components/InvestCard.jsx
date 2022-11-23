import { FaTrashAlt } from 'react-icons/fa';

function formatDate(date) {
  date = new Date(date + 'T03:00:00');

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return date.toLocaleString('pt-BR', options);
}

function formatCurrency(value) {
  value = Number(value);

  const options = {
    style: 'currency',
    currency: 'BRL',
  };

  return value.toLocaleString('pt-br', options);
}

function InvestCard({
  id,
  name,
  type,
  category,
  interest,
  start,
  end,
  value,
  setRemovedInvestiment,
}) {
  const handleRemoveClick = () => {
    setRemovedInvestiment({ id, name });
  };

  return (
    <div className="col">
      <div className="card">
        <div className="card-header">
          <span className="me-1">{name}</span>
          <span className="float-end badge bg-secondary">{type}</span>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">Categoria:</div>
            <div className="col-6 text-end">{category}</div>

            <div className="col-6">Rentabilidade:</div>
            <div className="col-6 text-end">{interest}</div>

            <div className="col-6">Entrada:</div>
            <div className="col-6 text-end">{formatDate(start)}</div>

            <div className="col-6">Resgate:</div>
            <div className="col-6 text-end">{formatDate(end)}</div>

            <div className="col-6">Valor:</div>
            <div className="col-6 text-end">{formatCurrency(value)}</div>
          </div>
        </div>
        <div className="card-footer">
          <FaTrashAlt
            className="float-end"
            data-bs-toggle="modal"
            data-bs-target="#removeModal"
            onClick={handleRemoveClick}
          />
        </div>
      </div>
    </div>
  );
}

export default InvestCard;
