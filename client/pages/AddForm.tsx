import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Plus, Trash2, Save, X, Code, Globe, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { authService } from "@/lib/auth";

interface Skill {
  name: string;
  color: string;
}

interface HostedWebsite {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  technologies: string[];
  createdAt: string;
}

export default function AddForm() {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    authService.isAuthenticated(),
  );
  const [skills, setSkills] = useState<Skill[]>([]);
  const [websites, setWebsites] = useState<HostedWebsite[]>([]);

  // Skills form state
  const [newSkill, setNewSkill] = useState({ name: "", color: "#3b82f6" });

  // Website form state
  const [isAddingWebsite, setIsAddingWebsite] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<string | null>(null);
  const [websiteForm, setWebsiteForm] = useState({
    title: "",
    description: "",
    url: "",
    image: "",
    technologies: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      // Load saved skills
      const savedSkills = localStorage.getItem("portfolio_skills");
      if (savedSkills) {
        try {
          setSkills(JSON.parse(savedSkills));
        } catch (error) {
          console.error("Error loading skills:", error);
        }
      }

      // Load saved websites
      const savedWebsites = localStorage.getItem("portfolio_websites");
      if (savedWebsites) {
        try {
          setWebsites(JSON.parse(savedWebsites));
        } catch (error) {
          console.error("Error loading websites:", error);
        }
      }
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      localStorage.setItem("portfolio_skills", JSON.stringify(updatedSkills));
      setNewSkill({ name: "", color: "#3b82f6" });
    }
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    localStorage.setItem("portfolio_skills", JSON.stringify(updatedSkills));
  };

  const handleWebsiteSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const websiteData: HostedWebsite = {
      id: editingWebsite || Date.now().toString(),
      title: websiteForm.title,
      description: websiteForm.description,
      url: websiteForm.url,
      image: websiteForm.image || undefined,
      technologies: websiteForm.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      createdAt: editingWebsite
        ? websites.find((w) => w.id === editingWebsite)?.createdAt ||
          new Date().toISOString()
        : new Date().toISOString(),
    };

    let updatedWebsites;
    if (editingWebsite) {
      updatedWebsites = websites.map((w) =>
        w.id === editingWebsite ? websiteData : w,
      );
      setEditingWebsite(null);
    } else {
      updatedWebsites = [websiteData, ...websites];
      setIsAddingWebsite(false);
    }

    setWebsites(updatedWebsites);
    localStorage.setItem("portfolio_websites", JSON.stringify(updatedWebsites));

    // Reset form
    setWebsiteForm({
      title: "",
      description: "",
      url: "",
      image: "",
      technologies: "",
    });
  };

  const handleEditWebsite = (website: HostedWebsite) => {
    setWebsiteForm({
      title: website.title,
      description: website.description,
      url: website.url,
      image: website.image || "",
      technologies: website.technologies.join(", "),
    });
    setEditingWebsite(website.id);
    setIsAddingWebsite(false);
  };

  const handleDeleteWebsite = (id: string) => {
    if (confirm("Are you sure you want to delete this website?")) {
      const updatedWebsites = websites.filter((w) => w.id !== id);
      setWebsites(updatedWebsites);
      localStorage.setItem(
        "portfolio_websites",
        JSON.stringify(updatedWebsites),
      );
    }
  };

  const handleCancel = () => {
    setIsAddingWebsite(false);
    setEditingWebsite(null);
    setWebsiteForm({
      title: "",
      description: "",
      url: "",
      image: "",
      technologies: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Portfolio Management
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your skills and live projects
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="border-slate-300 dark:border-slate-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>

        {/* Skills Management */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Core Technologies & Skills
            </CardTitle>
            <CardDescription>
              Add or remove skills that appear in your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add New Skill */}
            <div className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">Skill Name</label>
                <Input
                  value={newSkill.name}
                  onChange={(e) =>
                    setNewSkill((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g. React, TypeScript, AI Workflows"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Color</label>
                <Input
                  type="color"
                  value={newSkill.color}
                  onChange={(e) =>
                    setNewSkill((prev) => ({ ...prev, color: e.target.value }))
                  }
                  className="w-20"
                />
              </div>
              <Button onClick={handleAddSkill} disabled={!newSkill.name.trim()}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            {/* Current Skills */}
            <div className="space-y-4">
              <h4 className="font-medium">Current Skills ({skills.length})</h4>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 group"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {skill.name}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSkill(index)}
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Website Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Live Projects
            </CardTitle>
            <CardDescription>
              Add and manage live projects that will appear on your public
              portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Add Website Button */}
            <div className="mb-6">
              <Button
                onClick={() => setIsAddingWebsite(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isAddingWebsite || editingWebsite !== null}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Project
              </Button>
            </div>

            {/* Add/Edit Website Form */}
            {(isAddingWebsite || editingWebsite) && (
              <Card className="mb-6 border-blue-200 dark:border-blue-700">
                <CardHeader>
                  <CardTitle>
                    {editingWebsite ? "Edit Project" : "Add New Project"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleWebsiteSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          value={websiteForm.title}
                          onChange={(e) =>
                            setWebsiteForm((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          placeholder="Project Title"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">URL</label>
                        <Input
                          value={websiteForm.url}
                          onChange={(e) =>
                            setWebsiteForm((prev) => ({
                              ...prev,
                              url: e.target.value,
                            }))
                          }
                          placeholder="https://your-project.com"
                          type="url"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        value={websiteForm.description}
                        onChange={(e) =>
                          setWebsiteForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Describe your project..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Technologies
                      </label>
                      <Input
                        value={websiteForm.technologies}
                        onChange={(e) =>
                          setWebsiteForm((prev) => ({
                            ...prev,
                            technologies: e.target.value,
                          }))
                        }
                        placeholder="React, TypeScript, Node.js (comma separated)"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Image URL (optional)
                      </label>
                      <Input
                        value={websiteForm.image}
                        onChange={(e) =>
                          setWebsiteForm((prev) => ({
                            ...prev,
                            image: e.target.value,
                          }))
                        }
                        placeholder="https://image-url.com/screenshot.jpg"
                        type="url"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {editingWebsite ? "Update" : "Save"} Project
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Websites List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {websites.map((website) => (
                <Card
                  key={website.id}
                  className="group hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {website.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-slate-500 dark:text-slate-400">
                          {new Date(website.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditWebsite(website)}
                          disabled={isAddingWebsite || editingWebsite !== null}
                          className="h-8 w-8 p-0"
                        >
                          ✏️
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteWebsite(website.id)}
                          disabled={isAddingWebsite || editingWebsite !== null}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {website.image && (
                      <img
                        src={website.image}
                        alt={website.title}
                        className="w-full h-24 object-cover rounded-lg mb-3"
                      />
                    )}
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
                      {website.description}
                    </p>

                    {website.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {website.technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="w-full"
                    >
                      <a
                        href={website.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Site
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {websites.length === 0 && !isAddingWebsite && (
              <div className="text-center py-12 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
                <Globe className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  No projects added yet
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Start by adding your first project or website
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
