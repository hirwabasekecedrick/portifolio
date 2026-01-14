import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Plus, Globe, Edit, Trash2, ExternalLink, Save, X, Github, Code, LogOut } from 'lucide-react';
import { authService } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { githubService } from '@/lib/github';
import { ProjectData, SkillData } from '@shared/github';

interface HostedWebsite {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  technologies: string[];
  createdAt: string;
}

export default function Dashboard() {
  const [websites, setWebsites] = useState<HostedWebsite[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingWebsite, setIsAddingWebsite] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    image: '',
    technologies: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load websites from localStorage
        const savedWebsites = localStorage.getItem('portfolio_websites');
        if (savedWebsites) {
          setWebsites(JSON.parse(savedWebsites));
        }

        // Fetch GitHub data with fallback
        githubService.setUsername('Revis047');
        try {
          const [projectsData, skillsData] = await Promise.all([
            githubService.getProjectsData(),
            githubService.getSkillsData()
          ]);

          setProjects(projectsData);
          setSkills(skillsData);
        } catch (githubError) {
          console.warn('GitHub API unavailable, using empty data:', githubError);
          setProjects([]);
          setSkills([]);
        }
      } catch (error) {
        console.warn('Error in dashboard data fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const saveWebsites = (newWebsites: HostedWebsite[]) => {
    setWebsites(newWebsites);
    localStorage.setItem('portfolio_websites', JSON.stringify(newWebsites));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const websiteData: HostedWebsite = {
      id: editingWebsite || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      url: formData.url,
      image: formData.image || undefined,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: editingWebsite 
        ? websites.find(w => w.id === editingWebsite)?.createdAt || new Date().toISOString()
        : new Date().toISOString(),
    };

    if (editingWebsite) {
      // Update existing website
      const updatedWebsites = websites.map(w => 
        w.id === editingWebsite ? websiteData : w
      );
      saveWebsites(updatedWebsites);
      setEditingWebsite(null);
    } else {
      // Add new website
      saveWebsites([websiteData, ...websites]);
      setIsAddingWebsite(false);
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      url: '',
      image: '',
      technologies: '',
    });
  };

  const handleEdit = (website: HostedWebsite) => {
    setFormData({
      title: website.title,
      description: website.description,
      url: website.url,
      image: website.image || '',
      technologies: website.technologies.join(', '),
    });
    setEditingWebsite(website.id);
    setIsAddingWebsite(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this website?')) {
      const updatedWebsites = websites.filter(w => w.id !== id);
      saveWebsites(updatedWebsites);
    }
  };

  const handleCancel = () => {
    setIsAddingWebsite(false);
    setEditingWebsite(null);
    setFormData({
      title: '',
      description: '',
      url: '',
      image: '',
      technologies: '',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Portfolio Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Welcome! Manage your hosted websites and view GitHub portfolio data.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-red-300 dark:border-red-600 hover:border-red-400 dark:hover:border-red-500 hover:text-red-600 dark:hover:text-red-400"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* GitHub Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Github className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {projects.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                GitHub Projects
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Code className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {skills.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Technologies
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {websites.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Hosted Websites
              </div>
            </CardContent>
          </Card>
        </div>

        {/* GitHub Projects Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              GitHub Projects
            </CardTitle>
            <CardDescription>
              Latest projects from your GitHub account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      {project.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
                      {project.description || 'No description available'}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.languages.slice(0, 3).map((lang) => (
                        <Badge key={lang.name} variant="secondary" className="text-xs">
                          {lang.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                      <span>⭐ {project.stars}</span>
                      <span>🍴 {project.forks}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technologies Skills Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Technologies & Skills
            </CardTitle>
            <CardDescription>
              Programming languages and tools from GitHub analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: skill.color }}
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Private Projects Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Private Projects & Hosted Websites
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Projects and websites not published on GitHub
          </p>
          <Button
            onClick={() => setIsAddingWebsite(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isAddingWebsite || editingWebsite !== null}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Website/Project
          </Button>
        </div>

        {/* Add/Edit Website Form */}
        {(isAddingWebsite || editingWebsite) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editingWebsite ? 'Edit Website' : 'Add New Website'}
              </CardTitle>
              <CardDescription>
              Add details about your private projects, hosted websites, or work not on GitHub
            </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Website/Project Title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">URL</label>
                    <Input
                      value={formData.url}
                      onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="https://your-website.com"
                      type="url"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your website/project..."
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Technologies</label>
                  <Input
                    value={formData.technologies}
                    onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                    placeholder="React, TypeScript, Node.js, MongoDB (comma separated)"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Image URL (optional)</label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://image-url.com/screenshot.jpg"
                    type="url"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    {editingWebsite ? 'Update' : 'Save'} Website
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

        {/* Websites Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites.map((website) => (
            <Card key={website.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{website.title}</CardTitle>
                    <CardDescription className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(website.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(website)}
                      disabled={isAddingWebsite || editingWebsite !== null}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(website.id)}
                      disabled={isAddingWebsite || editingWebsite !== null}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
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
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
                  {website.description}
                </p>
                
                {website.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {website.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="w-full"
                >
                  <a href={website.url} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    Visit Website
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {websites.length === 0 && !isAddingWebsite && (
          <Card className="text-center py-12">
            <CardContent>
              <Globe className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                No websites added yet
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Start by adding your first hosted website or project
              </p>
              <Button
                onClick={() => setIsAddingWebsite(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Website
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
