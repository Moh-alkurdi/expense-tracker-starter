const shareText = "I'm tracking my income and expenses with Finance Tracker";

function ShareButtons() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(shareText);

  const links = [
    { name: "X", href: `https://twitter.com/intent/tweet?url=${url}&text=${text}` },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { name: "WhatsApp", href: `https://wa.me/?text=${text}%20${url}` },
  ];

  return (
    <div className="share-buttons">
      <span>Share:</span>
      {links.map(link => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="share-button"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}

export default ShareButtons
