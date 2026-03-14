export function formatRelativeTime(date: string): string {
  const now = new Date();
  const noteDate = new Date(date += 'T00:00-0800'); // Parse as local time
  const diffMs = now.getTime() - noteDate.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Less than 1 hour: "5m ago", "45m ago"
  if (diffHours < 1) {
    if (diffMins < 1) return 'just now';
    return `${diffMins}m ago`;
  }
  
  // Less than 24 hours: "5h ago", "23h ago"
  if (diffDays < 1) {
    return `${diffHours}h ago`;
  }
  
  // 1-7 days: "1d ago", "7d ago"
  if (diffDays <= 7) {
    return `${diffDays}d ago`;
  }
  
  // More than 7 days: "Nov 16", "Dec 25"
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[noteDate.getMonth()];
  const day = noteDate.getDate();
  
  // If different year, show year too
  if (noteDate.getFullYear() !== now.getFullYear()) {
    return `${month} ${day}, ${noteDate.getFullYear()}`;
  }
  
  return `${month} ${day}`;
}