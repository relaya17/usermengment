interface CardProps {
    title: string;
    description: string;
    image: string;
    businessId: string;
    phone: string;
    address: string;
    cardNumber: string;
    isLoggedIn: boolean;
    userRole?: 'guest' | 'business' | 'admin'; // אופציונלי
  }
  
  const Card: React.FC<CardProps> = ({
    title,
    description,
    image,
    businessId,
    phone,
    address,
    cardNumber,
    isLoggedIn,
    userRole
  }) => {
    const canEdit = isLoggedIn && (userRole === 'business' || userRole === 'admin');
  
    return (
      <div className="card shadow p-3" style={{ width: '18rem' }}>
        <img src={image} alt={title} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p><strong>📞</strong> {phone}</p>
          <p><strong>📍</strong> {address}</p>
          <p><strong>🆔</strong> {cardNumber}</p>
        </div>
        <div className="card-footer d-flex justify-content-around">
          <a href={`tel:${phone}`} className="btn btn-outline-primary">📞</a>
  
          {isLoggedIn && (
            <>
              <button className="btn btn-outline-danger">❤️</button>
              {canEdit && (
                <>
                  <button className="btn btn-outline-secondary">✏️</button>
                  <button className="btn btn-outline-dark">🗑️</button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  };
  