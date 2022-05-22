import Link from 'next/link';
import fs from 'fs';

type Props = {
  links: any[];
}

const Home = ({ links }: Props) => (
  <section style={{ width: '1280px', margin: '0 auto' }}>
    <header>
      <h1>Eugene Troynov</h1>
      <p>
        I'm Software engineer with 10+ years expirience.
      </p>
      <p>Currently i work for a company <a href='https://www.epam.com/'>Epam systems</a></p>
    </header>
    
    <div style={{
      display: 'flex'
    }}>
       <div>
        <h2>Contacts</h2>
        <ul style={{ margin: '0' }}>
          <li>
            phone: <a href="tel:+48793563532">+48 793 563 532</a>
          </li>
          <li>
            email: <a href="mailto:troinof@gmail.com">troinof@gmail.com</a>
          </li>
          <li>
            github: <a href="https://github.com/etroynov">etroynov</a>
          </li>
          <li>
            blog: <Link href="/blog">read</Link>
          </li>
        </ul>
      </div>
      <div>
        <h2>Recent articles</h2>
        <ul style={{ margin: '0' }}>
          {links.map(link => (
            <li key={link}><Link href={`/blog/${link}`}>{link}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export function getStaticProps() {
  const links = fs.readdirSync('./posts').map(file => file.replace('.md', ''));

  return {
    props: {
      links
    }
  }
}

export default Home;
