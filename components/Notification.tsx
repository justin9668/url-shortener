interface NotificationProps {
    show: boolean;
    message: string;
  }
  
  export function Notification({ show, message }: NotificationProps) {
    if (!show) return null;
    
    return (
      <div className="fixed top-4 justify-center px-4 py-2 rounded-md border border-gray-200 animate-fade-in-out">
        {message}
      </div>
    );
  }