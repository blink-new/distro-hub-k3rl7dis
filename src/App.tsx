import { useState } from 'react'
import { Search, Menu, X, Star, Download, Calendar, Users, TrendingUp } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Badge } from './components/ui/badge'

interface Distribution {
  id: string
  name: string
  description: string
  rank: number
  rating: number
  downloads: string
  lastUpdate: string
  category: string
  logo: string
  popularity: number
  website: string
}

const mockDistributions: Distribution[] = [
  {
    id: '1',
    name: 'Ubuntu',
    description: 'The most popular Linux distribution for desktop and server use.',
    rank: 1,
    rating: 4.8,
    downloads: '50M+',
    lastUpdate: '2024-01-15',
    category: 'Desktop',
    logo: '🐧',
    popularity: 95,
    website: 'https://ubuntu.com'
  },
  {
    id: '2',
    name: 'Arch Linux',
    description: 'A lightweight and flexible Linux distribution for advanced users.',
    rank: 2,
    rating: 4.6,
    downloads: '15M+',
    lastUpdate: '2024-01-10',
    category: 'Advanced',
    logo: '⚡',
    popularity: 88,
    website: 'https://archlinux.org'
  },
  {
    id: '3',
    name: 'Fedora',
    description: 'Cutting-edge Linux distribution sponsored by Red Hat.',
    rank: 3,
    rating: 4.5,
    downloads: '25M+',
    lastUpdate: '2024-01-12',
    category: 'Desktop',
    logo: '🎩',
    popularity: 82,
    website: 'https://fedoraproject.org'
  },
  {
    id: '4',
    name: 'Debian',
    description: 'The universal operating system, stable and reliable.',
    rank: 4,
    rating: 4.7,
    downloads: '30M+',
    lastUpdate: '2024-01-08',
    category: 'Server',
    logo: '🌀',
    popularity: 85,
    website: 'https://debian.org'
  },
  {
    id: '5',
    name: 'openSUSE',
    description: 'Professional Linux distribution with excellent tools.',
    rank: 5,
    rating: 4.4,
    downloads: '12M+',
    lastUpdate: '2024-01-14',
    category: 'Desktop',
    logo: '🦎',
    popularity: 75,
    website: 'https://opensuse.org'
  }
]

const categories = ['All', 'Desktop', 'Server', 'Advanced', 'Beginner', 'Gaming']

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedDistro, setSelectedDistro] = useState<Distribution | null>(null)

  const filteredDistributions = mockDistributions.filter(distro => {
    const matchesSearch = distro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         distro.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || distro.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-mono font-bold uppercase tracking-wider">
                DISTRO<span className="text-red-500">HUB</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="font-mono font-bold uppercase hover:text-red-500 transition-colors">
                Rankings
              </a>
              <a href="#" className="font-mono font-bold uppercase hover:text-red-500 transition-colors">
                Reviews
              </a>
              <a href="#" className="font-mono font-bold uppercase hover:text-red-500 transition-colors">
                Compare
              </a>
              <a href="#" className="font-mono font-bold uppercase hover:text-red-500 transition-colors">
                News
              </a>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="brutalist-button"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-black bg-white">
            <div className="px-4 py-4 space-y-2">
              <a href="#" className="block font-mono font-bold uppercase hover:text-red-500 transition-colors">
                Rankings
              </a>
              <a href="#" className="block font-mono font-bold uppercase hover:text-red-500 transition-colors">
                Reviews
              </a>
              <a href="#" className="block font-mono font-bold uppercase hover:text-red-500 transition-colors">
                Compare
              </a>
              <a href="#" className="block font-mono font-bold uppercase hover:text-red-500 transition-colors">
                News
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-mono font-bold uppercase tracking-wider mb-6">
              LINUX DISTRO
              <br />
              <span className="text-red-500">TRACKER 2025</span>
            </h2>
            <p className="text-xl font-mono mb-8 max-w-2xl mx-auto">
              DISCOVER, COMPARE, AND TRACK THE LATEST LINUX DISTRIBUTIONS
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="SEARCH DISTRIBUTIONS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="brutalist-input w-full text-lg font-mono uppercase pl-12"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2" size={20} />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`brutalist-button ${
                    selectedCategory === category 
                      ? 'bg-black text-white' 
                      : 'bg-white text-black hover:bg-black hover:text-white'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="brutalist-card text-center">
              <div className="text-3xl font-mono font-bold mb-2">500+</div>
              <div className="font-mono uppercase text-sm">DISTRIBUTIONS</div>
            </div>
            <div className="brutalist-card text-center">
              <div className="text-3xl font-mono font-bold mb-2">1M+</div>
              <div className="font-mono uppercase text-sm">MONTHLY USERS</div>
            </div>
            <div className="brutalist-card text-center">
              <div className="text-3xl font-mono font-bold mb-2">50K+</div>
              <div className="font-mono uppercase text-sm">REVIEWS</div>
            </div>
            <div className="brutalist-card text-center">
              <div className="text-3xl font-mono font-bold mb-2">24/7</div>
              <div className="font-mono uppercase text-sm">TRACKING</div>
            </div>
          </div>
        </div>
      </section>

      {/* Distribution Rankings */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h3 className="text-3xl font-mono font-bold uppercase mb-8 text-center">
            TOP DISTRIBUTIONS
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredDistributions.map((distro) => (
              <div
                key={distro.id}
                className="brutalist-card cursor-pointer hover:translate-x-1 hover:translate-y-1 transition-transform duration-200"
                onClick={() => setSelectedDistro(distro)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{distro.logo}</div>
                    <div>
                      <h4 className="font-mono font-bold text-lg uppercase">{distro.name}</h4>
                      <Badge className="bg-black text-white font-mono text-xs">
                        RANK #{distro.rank}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-mono font-bold">{distro.rating}</span>
                  </div>
                </div>
                
                <p className="font-mono text-sm mb-4 line-clamp-2">
                  {distro.description}
                </p>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Download size={16} />
                    </div>
                    <div className="font-mono text-xs font-bold">{distro.downloads}</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <Calendar size={16} />
                    </div>
                    <div className="font-mono text-xs font-bold">
                      {new Date(distro.lastUpdate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp size={16} />
                    </div>
                    <div className="font-mono text-xs font-bold">{distro.popularity}%</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Badge variant="outline" className="font-mono text-xs border-2 border-black">
                    {distro.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          {filteredDistributions.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-mono font-bold uppercase mb-2">NO RESULTS FOUND</h3>
              <p className="font-mono">TRY ADJUSTING YOUR SEARCH OR FILTERS</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white border-t-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-mono font-bold uppercase mb-4">DISTROHUB</h4>
              <p className="font-mono text-sm">
                THE ULTIMATE LINUX DISTRIBUTION TRACKER FOR 2025
              </p>
            </div>
            <div>
              <h4 className="font-mono font-bold uppercase mb-4">EXPLORE</h4>
              <ul className="space-y-2 font-mono text-sm">
                <li><a href="#" className="hover:text-red-500 transition-colors">RANKINGS</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">REVIEWS</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">COMPARE</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">NEWS</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono font-bold uppercase mb-4">CATEGORIES</h4>
              <ul className="space-y-2 font-mono text-sm">
                <li><a href="#" className="hover:text-red-500 transition-colors">DESKTOP</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">SERVER</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">ADVANCED</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">BEGINNER</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono font-bold uppercase mb-4">CONNECT</h4>
              <ul className="space-y-2 font-mono text-sm">
                <li><a href="#" className="hover:text-red-500 transition-colors">GITHUB</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">TWITTER</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">DISCORD</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">RSS</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t-2 border-white mt-8 pt-8 text-center">
            <p className="font-mono text-sm">
              © 2025 DISTROHUB. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>

      {/* Distribution Detail Modal */}
      {selectedDistro && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="brutalist-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{selectedDistro.logo}</div>
                <div>
                  <h2 className="text-2xl font-mono font-bold uppercase">{selectedDistro.name}</h2>
                  <Badge className="bg-black text-white font-mono">
                    RANK #{selectedDistro.rank}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDistro(null)}
                className="brutalist-button"
              >
                <X size={20} />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-mono font-bold uppercase mb-2">DESCRIPTION</h3>
                <p className="font-mono text-sm">{selectedDistro.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-mono font-bold uppercase mb-2">RATING</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-mono font-bold text-lg">{selectedDistro.rating}/5</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-mono font-bold uppercase mb-2">DOWNLOADS</h3>
                  <div className="font-mono font-bold text-lg">{selectedDistro.downloads}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-mono font-bold uppercase mb-2">LAST UPDATE</h3>
                  <div className="font-mono">{new Date(selectedDistro.lastUpdate).toLocaleDateString()}</div>
                </div>
                <div>
                  <h3 className="font-mono font-bold uppercase mb-2">POPULARITY</h3>
                  <div className="font-mono font-bold">{selectedDistro.popularity}%</div>
                </div>
              </div>
              
              <div>
                <h3 className="font-mono font-bold uppercase mb-2">CATEGORY</h3>
                <Badge variant="outline" className="font-mono border-2 border-black">
                  {selectedDistro.category}
                </Badge>
              </div>
              
              <div className="flex space-x-4">
                <Button className="brutalist-button flex-1">
                  VISIT WEBSITE
                </Button>
                <Button className="brutalist-button flex-1">
                  WRITE REVIEW
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App