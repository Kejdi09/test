import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-abaya.jpg';

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <img
          src={heroImage}
          alt="About NoorModest"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-5xl md:text-6xl text-background mb-4">Our Story</h1>
          <p className="font-body text-background/80 text-lg">Celebrating modesty with elegance</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-accent font-body text-sm uppercase tracking-[0.3em]">
                About Us
              </span>
              <h2 className="font-display text-4xl text-foreground mt-2 mb-6">
                Fashion That Honors Your Values
              </h2>
            </div>

            <div className="prose prose-lg max-w-none font-body text-muted-foreground leading-relaxed space-y-6">
              <p>
                NoorModest was born from a simple belief: that modest fashion should be as beautiful, 
                contemporary, and luxurious as any other form of fashion. Founded in 2020, we set out 
                to create a brand that celebrates the elegance of modesty while honoring the diverse 
                needs of Muslim women worldwide.
              </p>
              <p>
                Our name "Noor" means "light" in Arabic, and it represents our mission—to bring light 
                and joy to modest fashion. We believe that covering up doesn't mean compromising on 
                style. Each piece in our collection is thoughtfully designed to make you feel 
                confident, beautiful, and true to your values.
              </p>
              <p>
                From the delicate embroidery on our abayas to the luxurious fabrics of our hijabs, 
                every detail is crafted with care. We work with skilled artisans who share our 
                commitment to quality, ensuring that each garment is not just beautiful, but built 
                to last.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { number: '50+', label: 'Countries Shipped' },
                { number: '10K+', label: 'Happy Customers' },
                { number: '100%', label: 'Quality Promise' },
              ].map((stat, index) => (
                <div key={index} className="text-center p-8 bg-sage-light rounded-lg">
                  <p className="font-display text-4xl text-primary mb-2">{stat.number}</p>
                  <p className="font-body text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link to="/shop">
                <Button className="btn-primary font-body uppercase tracking-wider px-8">
                  Explore Our Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
