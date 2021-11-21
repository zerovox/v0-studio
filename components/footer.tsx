import Container from "./container";
import DateFormatter from "./date-formatter";

const Footer = () => {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-28 text-center lg:text-left">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight mb-2 lg:pr-4 lg:w-1/2">
            Beep
          </h3>
          Page generated at&nbsp;
          <DateFormatter dateString={new Date().toISOString()} showTime={true} />.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
