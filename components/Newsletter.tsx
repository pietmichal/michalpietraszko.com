import React from "react";

export default function Newsletter() {
  return (
    <div className="pt-8">
      <div className="bg-gray-700 rounded-md shadow-lg mb-6 test text-white">
        <div>
          <div className="py-16 px-4">
            <div className="font-bold text-3xl text-center">
              Are you interested in more content like this?
            </div>
            <div className="text-center">
              Subscribe to the newsletter to get notified!
            </div>
            <div className="text-center pt-4">
              <form>
                <input
                  type="email"
                  name="email"
                  placeholder="Your e-mail address"
                  required
                  className="py-2 px-6 rounded-md mr-4 text-black shadow-md"
                />
                <button className="rounded-md bg-red-600 text-white py-2 px-6 font-bold shadow-md">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
