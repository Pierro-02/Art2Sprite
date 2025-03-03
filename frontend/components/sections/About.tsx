export function About() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-themeblue">About Art2Sprite Creators</h2>
          <p className="text-gray-900">
            We are a team of passionate AI enthusiasts dedicated to streamlining the creative process in game development.
            Our mission is to empower creators with innovative tools that simplify workflows and unleash creativity.
          </p>
        </div>        
      </div>
    </section>
  );
}

/*
<div className="grid md:grid-cols-3 gap-8">
{[
  {
    number: "10+",
    label: "Years Experience",
    description: "Decade of excellence in digital solutions"
  },
  {
    number: "200+",
    label: "Projects Completed",
    description: "Successful projects across various industries"
  },
  {
    number: "50+",
    label: "Team Members",
    description: "Skilled professionals at your service"
  }
].map((stat, index) => (
  <div key={index} className="text-center p-6 rounded-lg bg-gray-50">
    <div className="text-4xl font-bold mb-2">{stat.number}</div>
    <div className="text-lg font-semibold mb-2">{stat.label}</div>
    <p className="text-gray-600">{stat.description}</p>
  </div>
))}
</div>
*/