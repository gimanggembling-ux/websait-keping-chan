const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Kevin Christian. All rights reserved. 💖
        </p>
      </div>
    </footer>
  );
};

export default Footer;
