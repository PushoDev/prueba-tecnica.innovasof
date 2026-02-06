import React from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Divider,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

const drawerWidth = 240;

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { text: 'INICIO', icon: <HomeIcon />, path: '/home', code: 'IN' },
    { text: 'Consulta Clientes', icon: <PeopleIcon />, path: '/clientes', code: 'CC' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {isAuthenticated() && (
        <>
          {/* Header superior */}
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: 'primary.main',
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                Innovasoft
              </Typography>
              <Typography variant="body2" sx={{ mr: 2 }}>
                {user?.username || 'Usuario'}
              </Typography>
              <IconButton color="inherit" onClick={handleLogout} sx={{ cursor: 'pointer' }}>
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          {/* Sidebar */}
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: '#e8e8e8',
                borderRight: '1px solid #d0d0d0',
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto', mt: 2 }}>
              {/* Avatar y nombre de usuario */}
              <Box sx={{ textAlign: 'center', mb: 3, px: 2 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    margin: '0 auto',
                    mb: 1,
                    backgroundColor: '#666',
                  }}
                >
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
                <Typography variant="body2" fontWeight={600}>
                  {user?.username || 'Nombre de Usuario'}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Menú */}
              <Typography
                variant="h6"
                sx={{
                  px: 2,
                  mb: 1,
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
              >
                MENÚ
              </Typography>

              <List>
                {menuItems.map((item) => (
                  <ListItem
                    button
                    key={item.text}
                    onClick={() => navigate(item.path)}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor: isActive(item.path)
                        ? 'rgba(33, 150, 243, 0.1)'
                        : 'transparent',
                      borderLeft: isActive(item.path)
                        ? '4px solid #2196f3'
                        : '4px solid transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(33, 150, 243, 0.05)',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: isActive(item.path) ? '#2196f3' : '#666',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            mr: 1,
                          }}
                        >
                          {item.code}
                        </Typography>
                        {React.cloneElement(item.icon, { fontSize: 'small' })}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: '0.9rem',
                        fontWeight: isActive(item.path) ? 600 : 400,
                        color: isActive(item.path) ? '#2196f3' : '#333',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </>
      )}

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          marginLeft: isAuthenticated() ? 0 : 0,
          marginTop: isAuthenticated() ? '64px' : 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
