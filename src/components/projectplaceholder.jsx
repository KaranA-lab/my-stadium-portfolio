// src/components/ProjectPlaceholder.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const projectData = {
  1: {
    title: 'Alexander Babu: Portfolio Ticket Booking Webisite',
    description: 'Designing the portfolio website for renowned comedian Alexander Babu was a defining milestone in my UI/UX journey. This project marked my transition from intern to full-fledged designer, as I took full ownership of the design process while closely collaborating with the development team to bring the vision to life. With a modern magazine-style layout, the site was crafted to reflect Alexander’s vibrant stage presence and celebrity appeal  offering users an engaging experience to explore his shows, check tour dates, browse merchandise, and even book tickets. The entire UI/UX design was completed in just one week, while development extended over two months to perfect the interactive elements and responsive performance. Alexander himself was highly impressed, offering me a personal note of thanks that remains a cherished memory. It was my first large-scale live project, and the pressure to deliver something impactful was immense  but that pressure fueled my creativity rather than stifling it. I approached every layout decision with the audience in mind, balancing personality with usability. Seeing it all come together, knowing it was helping a public figure connect more meaningfully with fans, was deeply fulfilling. This project taught me not just how to design for scale, but how to design with heart.',
    link: 'https://www.figma.com/proto/12dmq58aKv9Hvzq8QVN8MQ/Portfolio?page-id=4%3A9&node-id=10-11901&viewport=29%2C174%2C0.05&t=r6CtQgxpEIa7Cumv-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=10%3A11901',
    backgroundImage: '/assets/images/project1bg.jpg',
  },
  2: {
    title: 'RMKV : Wedding Collection',
    description: 'The RMKV Wedding Revival Collection project challenged me to craft a premium, heritage-rich digital experience for one of India’s most iconic silk brands. Tasked with creating a distinct identity for this special line separate from RMKV’s broader catalogue I designed a clean, luxurious interface that evoked the elegance and prestige of traditional bridal silk. Using a muted, vintage-inspired palette and editorial-style layouts, the site allowed users to not only explore the sarees but also immerse themselves in the stories, craftsmanship, and cultural depth behind each weave. It offered a seamless flow from discovery to deeper exploration, helping users view detailed product narratives and find related designs within the same collection. The project demanded a refined balance of grandeur and usability  a tone that resonates with discerning wedding shoppers while remaining responsive across all devices. Personally, this was a deeply rewarding experience; it allowed me to fuse storytelling with visual sophistication and taught me how to design for legacy, emotion, and brand differentiation. Every pixel was placed with intention  to honor tradition while keeping it digitally relevant. Seeing it all come together as a polished, immersive experience was a proud moment in my design career.dernized the UI and improved usability for a SaaS analytics dashboard.',
    link: 'https://www.figma.com/proto/12dmq58aKv9Hvzq8QVN8MQ/Portfolio?page-id=4%3A9&node-id=251-3978&viewport=29%2C174%2C0.05&t=r6CtQgxpEIa7Cumv-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=251%3A3978',
    backgroundImage: '/assets/images/project2bg.jpg',
  },
  3: {
    title: 'Classmate Notebook: E-commerce Website',
    description: 'Collaborating on the Classmate Notebook Customization Platform was a rewarding experience that pushed my design thinking to new heights. I played a key role in crafting the UX flow, visual layouts, micro-interactions, and most importantly, developing a complex design system that ensured consistency across this large-scale, interactive platform. The product allowed users to customise every detail of their notebooks  from cover designs to page styles and bindings  and my focus was to make that journey feel effortless, engaging, and empowering. Creating micro-interactions that responded meaningfully to user input added a layer of delight that made the experience feel personal and tactile. Working alongside a multidisciplinary team, I ensured that the design system was robust, scalable, and adaptable to both desktop and mobile devices. It was a major learning curve in translating user needs into modular design components while maintaining a cohesive visual identity. Seeing users actively enjoy building their own notebooks on a platform I helped shape was immensely fulfilling. This project taught me the power of thoughtful systems, and how great UX is often hidden in the details that just feel right.',
    link: 'https://www.figma.com/proto/12dmq58aKv9Hvzq8QVN8MQ/Portfolio?page-id=4%3A9&node-id=14-14868&viewport=29%2C174%2C0.05&t=r6CtQgxpEIa7Cumv-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=14%3A14868&show-proto-sidebar=1',
    backgroundImage: '/assets/images/project3bg.jpg',
  },
  4: {
    title: 'Deepsense Company Website',
    description: 'Designing the Deepsense company website was one of the most creatively liberating experiences in my UI/UX career. As an in-house designer, I was entrusted with full ownership of the project from concept to prototype and given the rare freedom to pitch bold, original ideas without constraints. I explored multiple visual directions, ultimately presenting 3 to 4 distinct website prototypes, each rooted in a different design philosophy. The leadership team appreciated the diversity of thought, and one concept resonated so well that it was immediately chosen and put on hold for further development. This project allowed me to exercise full creative control, pushing boundaries in layout structure, navigation patterns, and brand storytelling. I used the opportunity to craft a digital presence that was not just professional but also emotionally resonant, showcasing the company’s capabilities while making the user journey feel fresh and confident. Collaborating cross-functionally within the team while being the lead on vision and execution helped me grow not just as a designer, but as a creative strategist. The experience reaffirmed my belief that the best designs emerge when trust and creative freedom meet structured experimentation.Built a scalable design system with tokens, components, and usage guides.',
    link: 'https://www.figma.com/proto/12dmq58aKv9Hvzq8QVN8MQ/Portfolio?page-id=4%3A9&node-id=15-15928&viewport=29%2C174%2C0.05&t=r6CtQgxpEIa7Cumv-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=15%3A15928&show-proto-sidebar=1',
    backgroundImage: '/assets/images/project4bg.jpg',
  },
  5: {
    title: 'Naturals Bridal landing page',
    description: 'The Naturals Bridal Landing Page project was a fast-paced yet high-impact assignment where I was tasked with creating a visually striking and conversion-focused entry point for the brand’s bridal services. With only a short turnaround time, I developed a clean, elegant layout that captured the essence of modern bridal beauty while remaining aligned with Naturals’ brand identity. The page served as both an aesthetic showcase and a functional funnel  guiding users through bridal offerings, service highlights, testimonials, and direct booking CTAs. I focused heavily on visual hierarchy, color psychology, and modular layouts to ensure clarity and emotional resonance at every scroll point. Subtle micro-interactions and image transitions helped elevate the user experience without distracting from the core message. This project was also where I exercised rapid ideation, creating multiple versions quickly to meet the clients high standards and tight deadlines. It taught me how to blend commercial goals with design elegance  and the final output not only impressed the client but also became a key asset in their campaign strategy.',
    link: 'https://www.figma.com/proto/12dmq58aKv9Hvzq8QVN8MQ/Portfolio?page-id=4%3A9&node-id=9-7744&viewport=29%2C174%2C0.05&t=r6CtQgxpEIa7Cumv-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=9%3A7744&show-proto-sidebar=1',
    backgroundImage: '/assets/images/project5bg.jpg',
  },
  6: {
    title: 'MTR Spices Landing Page',
    description: 'Increased conversion by streamlining checkout and refining product pages.',
    link: 'https://www.figma.com/proto/12dmq58aKv9Hvzq8QVN8MQ/Portfolio?page-id=4%3A9&node-id=251-6401&viewport=29%2C174%2C0.05&t=r6CtQgxpEIa7Cumv-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=251%3A6401&show-proto-sidebar=1',
    backgroundImage: '/assets/images/project6bg.jpg',
  },
};

export default function ProjectPlaceholder({ projectId }) {
  const project = projectData[projectId];
  const backgroundImage = project?.backgroundImage;

  return (
    <div
      style={{
        height: '100vh',
        padding: '2rem',
        backgroundColor: '#111',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        fontFamily: 'Oswald, sans-serif',
      }}
    >
      {project ? (
        <>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            {project.title}
          </h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            {project.description}
          </p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '1.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#fff',
              color: '#000',
              borderRadius: '0.5rem',
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
          >
            View Project
          </a>
        </>
      ) : (
        <>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            🚧 Project {projectId} Coming Soon
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            This page is a placeholder for your portfolio project.
          </p>
        </>
      )}

      <br />
      <Link
        to="/"
        style={{
          marginTop: '2rem',
          display: 'inline-block',
          color: '#fff',
          textDecoration: 'underline',
        }}
      >
        ⬅ Back to Stadium
      </Link>
    </div>
  );
}






