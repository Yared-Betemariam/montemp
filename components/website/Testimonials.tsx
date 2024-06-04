/* eslint-disable react/no-unescaped-entities */
import { TestimonialsData } from "@/data/website";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Testimonials = () => {
  return (
    <section id="Testimonials" className="w-full py-24">
      <div className="container px-4 md:px-6 flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg text-primary shadow-sm bg-gray-100 px-3 py-1 text-base font-semibold dark:bg-gray-800 border border-primary">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              What Our Customers Say
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Hear from our satisfied customers and learn how our SaaS platform
              has transformed their email marketing efforts.
            </p>
          </div>
        </div>
        <div className="mx-auto grid items-start gap-8 sm:max-w-3xl grid-cols-2">
          {TestimonialsData.map((item) => (
            <div
              key={item.comment}
              className="grid gap-4 border border-primary rounded-xl shadow"
            >
              <div className="rounded-xl bg-gray-100 p-4 dark:bg-gray-800">
                <blockquote className="text-base font-semibold leading-relaxed">
                  "{item.comment}"
                </blockquote>
                <div className="mt-4 flex items-center space-x-4">
                  <Avatar className="simpleborder">
                    <AvatarImage src="/avatars/01.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {item.job}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
