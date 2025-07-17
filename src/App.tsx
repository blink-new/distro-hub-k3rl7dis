import { useState } from 'react'
import { Search, Menu, X, Star, Download, Calendar, Users, TrendingUp, GitBranch, Package, Shield, Zap } from 'lucide-react'
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
  packageType: string[]
  architecture: string[]
  basedOn: string
  releaseModel: string
  features: string[]
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
    website: 'https://ubuntu.com',
    packageType: ['DEB', 'Snap', 'Flatpak'],
    architecture: ['x86_64', 'ARM64', 'ARM'],
    basedOn: 'Debian',
    releaseModel: 'Fixed',
    features: ['LTS Support', 'Enterprise Ready', 'Large Community', 'Hardware Support']
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
    website: 'https://archlinux.org',
    packageType: ['Pacman', 'AUR', 'Flatpak'],
    architecture: ['x86_64', 'ARM64'],
    basedOn: 'Independent',
    releaseModel: 'Rolling',
    features: ['Rolling Release', 'Minimalist', 'DIY Philosophy', 'AUR Repository']
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
    website: 'https://fedoraproject.org',
    packageType: ['RPM', 'Flatpak', 'AppImage'],
    architecture: ['x86_64', 'ARM64', 'ARM'],
    basedOn: 'Independent',
    releaseModel: 'Fixed',
    features: ['Latest Software', 'SELinux', 'GNOME Default', 'Red Hat Backing']
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
    website: 'https://debian.org',
    packageType: ['DEB', 'Flatpak'],
    architecture: ['x86_64', 'ARM64', 'ARM', 'i386'],
    basedOn: 'Independent',
    releaseModel: 'Fixed',
    features: ['Rock Solid', 'Huge Repository', 'Multiple Architectures', 'Free Software']
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
    website: 'https://opensuse.org',
    packageType: ['RPM', 'Flatpak', 'AppImage'],
    architecture: ['x86_64', 'ARM64'],
    basedOn: 'Independent',
    releaseModel: 'Fixed/Rolling',
    features: ['YaST Configuration', 'Btrfs Default', 'Professional Tools', 'SUSE Backing']
  }
]

const categories = ['All', 'Desktop', 'Server', 'Advanced', 'Beginner', 'Gaming']

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedDistro, setSelectedDistro] = useState<Distribution | null>(null)
  const [compareMode, setCompareMode] = useState(false)
  const [compareList, setCompareList] = useState<Distribution[]>([])

  const filteredDistributions = mockDistributions.filter(distro => {
    const matchesSearch = distro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         distro.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || distro.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleCompare = (distro: Distribution) => {
    if (compareList.find(d => d.id === distro.id)) {
      setCompareList(compareList.filter(d => d.id !== distro.id))
    } else if (compareList.length < 3) {
      setCompareList([...compareList, distro])
    }
  }

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
            <div className="flex flex-wrap justify-center gap-4 mb-6">
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

            {/* Compare Mode Toggle */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setCompareMode(!compareMode)}
                className={`brutalist-button ${
                  compareMode 
                    ? 'bg-yellow-400 text-black' 
                    : 'bg-white text-black hover:bg-yellow-400 hover:text-black'
                }`}
              >
                {compareMode ? 'EXIT COMPARE' : 'COMPARE MODE'}
              </Button>
              {compareList.length > 1 && (
                <Button
                  onClick={() => setSelectedDistro({ id: 'compare', name: 'Compare', description: '', rank: 0, rating: 0, downloads: '', lastUpdate: '', category: '', logo: '', popularity: 0, website: '', packageType: [], architecture: [], basedOn: '', releaseModel: '', features: [] })}
                  className="brutalist-button bg-green-400 text-black hover:bg-green-500"
                >
                  COMPARE ({compareList.length})
                </Button>
              )}
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
                className={`brutalist-card cursor-pointer hover:translate-x-1 hover:translate-y-1 transition-transform duration-200 ${
                  compareList.find(d => d.id === distro.id) ? 'ring-4 ring-yellow-400' : ''
                }`}
                onClick={() => compareMode ? toggleCompare(distro) : setSelectedDistro(distro)}
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
                
                <div className="mt-4 space-y-2">
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="font-mono text-xs border-2 border-black">
                      {distro.category}
                    </Badge>
                    <Badge className="bg-blue-500 text-white font-mono text-xs">
                      {distro.releaseModel}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {distro.packageType.slice(0, 2).map((pkg) => (
                      <Badge key={pkg} className="bg-gray-800 text-white font-mono text-xs">
                        {pkg}
                      </Badge>
                    ))}
                    {distro.packageType.length > 2 && (
                      <Badge className="bg-gray-600 text-white font-mono text-xs">
                        +{distro.packageType.length - 2}
                      </Badge>
                    )}
                  </div>
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
      {selectedDistro && selectedDistro.id !== 'compare' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="brutalist-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-mono font-bold uppercase mb-2 flex items-center gap-2">
                    <Package size={16} />
                    DESCRIPTION
                  </h3>
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
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-mono font-bold uppercase mb-2 flex items-center gap-2">
                    <GitBranch size={16} />
                    TECHNICAL INFO
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-mono text-sm font-bold">BASED ON:</span>
                      <span className="font-mono text-sm ml-2">{selectedDistro.basedOn}</span>
                    </div>
                    <div>
                      <span className="font-mono text-sm font-bold">RELEASE MODEL:</span>
                      <span className="font-mono text-sm ml-2">{selectedDistro.releaseModel}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-mono font-bold uppercase mb-2 flex items-center gap-2">
                    <Package size={16} />
                    PACKAGE TYPES
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDistro.packageType.map((pkg) => (
                      <Badge key={pkg} className="bg-gray-800 text-white font-mono text-xs">
                        {pkg}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-mono font-bold uppercase mb-2 flex items-center gap-2">
                    <Zap size={16} />
                    ARCHITECTURES
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDistro.architecture.map((arch) => (
                      <Badge key={arch} className="bg-blue-600 text-white font-mono text-xs">
                        {arch}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-mono font-bold uppercase mb-2 flex items-center gap-2">
                    <Shield size={16} />
                    KEY FEATURES
                  </h3>
                  <div className="space-y-1">
                    {selectedDistro.features.map((feature) => (
                      <div key={feature} className="font-mono text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-black"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-8">
              <Button className="brutalist-button flex-1">
                VISIT WEBSITE
              </Button>
              <Button className="brutalist-button flex-1">
                WRITE REVIEW
              </Button>
              <Button 
                className="brutalist-button"
                onClick={() => toggleCompare(selectedDistro)}
              >
                {compareList.find(d => d.id === selectedDistro.id) ? 'REMOVE FROM COMPARE' : 'ADD TO COMPARE'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {selectedDistro && selectedDistro.id === 'compare' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="brutalist-card max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-2xl font-mono font-bold uppercase">DISTRIBUTION COMPARISON</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDistro(null)}
                className="brutalist-button"
              >
                <X size={20} />
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="text-left p-4 font-bold uppercase">FEATURE</th>
                    {compareList.map((distro) => (
                      <th key={distro.id} className="text-center p-4 font-bold uppercase min-w-[200px]">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="text-2xl">{distro.logo}</div>
                          <div>{distro.name}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="p-4 font-bold">RANK</td>
                    {compareList.map((distro) => (
                      <td key={distro.id} className="p-4 text-center">#{distro.rank}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-4 font-bold">RATING</td>
                    {compareList.map((distro) => (
                      <td key={distro.id} className="p-4 text-center">{distro.rating}/5</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-4 font-bold">CATEGORY</td>
                    {compareList.map((distro) => (
                      <td key={distro.id} className="p-4 text-center">{distro.category}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-4 font-bold">BASED ON</td>
                    {compareList.map((distro) => (
                      <td key={distro.id} className="p-4 text-center">{distro.basedOn}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-4 font-bold">RELEASE MODEL</td>
                    {compareList.map((distro) => (
                      <td key={distro.id} className="p-4 text-center">{distro.releaseModel}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-4 font-bold">PACKAGE TYPES</td>
                    {compareList.map((distro) => (
                      <td key={distro.id} className="p-4 text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {distro.packageType.map((pkg) => (
                            <Badge key={pkg} className="bg-gray-800 text-white text-xs">
                              {pkg}
                            </Badge>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-4 font-bold">ARCHITECTURES</td>
                    {compareList.map((distro) => (
                      <td key={distro.id} className="p-4 text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {distro.architecture.map((arch) => (
                            <Badge key={arch} className="bg-blue-600 text-white text-xs">
                              {arch}
                            </Badge>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-4 font-bold">POPULARITY</td>
                    {compareList.map((distro) => (
                      <td key={distro.id} className="p-4 text-center">{distro.popularity}%</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">KEY FEATURES</td>
                    {compareList.map((distro) => (
                      <td key={distro.id} className="p-4">
                        <div className="space-y-1">
                          {distro.features.map((feature) => (
                            <div key={feature} className="text-xs flex items-center gap-1">
                              <span className="w-1 h-1 bg-black"></span>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button 
                className="brutalist-button"
                onClick={() => {
                  setCompareList([])
                  setSelectedDistro(null)
                  setCompareMode(false)
                }}
              >
                CLEAR COMPARISON
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App