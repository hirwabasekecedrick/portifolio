import {
  Mail,
  Github,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  Settings,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-slate-100 dark:via-blue-200 dark:to-slate-100 bg-clip-text text-transparent mb-4">
            Ready to Hire?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
             Get instant access to my professional resources and let's discuss
            how I can contribute to your team's success
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Professional Info */}
          <div className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
                  <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  Professional Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Full-stack developer specializing in modern web technologies,
                  automation, and AI workflows. Ready to contribute to
                  innovative projects and drive technical excellence.
                </p>

                <div className="space-y-3">
                  <a
                    href="mailto:johnlevy047@gmail.com?subject=Job%20Opportunity"
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group border border-transparent hover:border-blue-200 dark:hover:border-blue-700"
                  >
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      hirwabasekecedrick@gmail.com
                    </span>
                  </a>

                  <a
                    href="https://github.com/Revis047"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group border border-transparent hover:border-blue-200 dark:hover:border-blue-700"
                  >
                    <Github className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      github.com/hirwabasekecedrick
                    </span>
                  </a>

               
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700">
                    <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="text-green-700 dark:text-green-300 font-medium">
                      Kigali, Rwanda (Remote Available)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="text-center border-slate-200 dark:border-slate-700 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                <CardContent className="p-4">
                  <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-1">
                    Available
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    Immediate Start
                  </div>
                </CardContent>
              </Card>
              <Card className="text-center border-slate-200 dark:border-slate-700 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                <CardContent className="p-4">
                  <Award className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-700 dark:text-green-300 mb-1">
                    Certified
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400">
                    Full-Stack
                  </div>
                </CardContent>
              </Card>
              <Card className="text-center border-slate-200 dark:border-slate-700 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                <CardContent className="p-4">
                  <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-purple-700 dark:text-purple-300 mb-1">
                    Remote
                  </div>
                  <div className="text-xs text-purple-600 dark:text-purple-400">
                    Worldwide
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Why Choose Me */}
          <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-slate-100">
                Why Choose Me?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span> Experience in modern web development</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Expertise in React, TypeScript, and Node.js</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Specialization in automation and AI workflows</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Strong problem-solving and communication skills</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>No-code/low-code platform expertise</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Remote work experience with global teams</span>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <Button
                  onClick={() =>
                    window.open(
                      "mailto:hirwabasekecedrick@gmail.com?subject=Job%20Opportunity&body=Hi%20John,%0A%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20opportunity.%0A%0ABest%20regards",
                      "_blank",
                    )
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:shadow-lg"
                  size="lg"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Let's Discuss Opportunities
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
