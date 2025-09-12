import { Badge, type BadgeProps } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { memo } from 'react';

type Props = BadgeProps & {
  score: number;
  showIcon?: boolean;
  className?: string;
};

// Helper function to get badge color based on score
const getScoreBadgeColor = (score: number) => {
  if (score >= 75) {
    return 'bg-green-100 text-green-700 dark:bg-green-600'; // Green for 75-100
  } else if (score >= 50) {
    return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-600'; // Yellow for 50-74
  } else if (score >= 25) {
    return 'bg-orange-100 text-orange-700 dark:bg-orange-600'; // Orange for 25-49
  } else {
    return 'bg-red-100 text-red-700 dark:bg-red-600'; // Red for 0-24
  }
};

const ScoreBadge = ({
  score,
  showIcon = true,
  className = '',
  ...props
}: Props) => {
  return (
    <Badge className={`${getScoreBadgeColor(score)} ${className}`} {...props}>
      {showIcon && <Star className="mr-1 h-3 w-3" />}
      {score}
    </Badge>
  );
};

export default memo(ScoreBadge);
