"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const testimonials = [
    {
        name: "Abdullah",
        title: "Software Engineer",
        avatar: "A",
        description: "This is the best Application I've ever used! ❤️"
    },
    {
        name: "Steve",
        title: "CEO of Company X",
        avatar: "B",
        description: "This application has transformed the way we work. Highly recommended! 👍"
    },
    {
        name: "Emily",
        title: "Graphic Designer",
        avatar: "C",
        description: "As a creative professional, I find this app incredibly intuitive and versatile. 💎"
    },
    {
        name: "Lisa",
        title: "Marketing Manager",
        avatar: "D",
        description: "Our marketing campaigns have seen a significant boost in efficiency after using this app. 🚀"
    },
    {
        name: "Michael",
        title: "Student",
        avatar: "E",
        description: "A must-have tool for students like me. It's made studying and organizing tasks so much easier! 📚"
    },
    {
        name: "Sarah",
        title: "Freelancer",
        avatar: "F",
        description: "Managing projects and clients has never been smoother. This app is a game-changer. 🎮"
    }
];

const LandingContent = () => {
  return (
    <div className="pb-20 px-10">
      <h1 className="text-center text-xl font-extrabold mb-10 text-white ">
          Testimonials
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cold-4 gap-4">
         {testimonials.map((item) =>(
            <Card key={item.description} className="bg-[#192339] border-none text-white">
              <CardHeader>
                 <CardTitle className='flex items-center gap-x-2'>
                   <div>
                     <p className="text-lg">
                        {item.name}
                     </p>
                     <p className="text-zinc-400 text-sm">
                        {item.title}
                     </p>
                   </div>
                 </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 ">
                {item.description}
              </CardContent>
            </Card>
         ))}
      </div>
    </div>
  )
}

export default LandingContent
