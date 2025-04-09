import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function SimpleBadge({ Notificationcount }) {
    console.log(Notificationcount, "Notification count in badge");
  return (
    <Badge badgeContent={Notificationcount} color="primary">
      <NotificationsNoneIcon color="action" />
    </Badge>
  );
}
