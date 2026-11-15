import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, RefreshControl, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const API_URL = 'http://localhost:3000/api/v1';

export default function FeedScreen() {
  const { user, token, logout } = useAuth();
  const { theme, themeName, setTheme } = useTheme();
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadFeed = async () => {
    try {
      const res = await axios.get(`${API_URL}/feed`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFeed();
    setRefreshing(false);
  };

  const handlePost = async () => {
    if (!content.trim()) return;
    try {
      await axios.post(`${API_URL}/posts`, { content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContent('');
      loadFeed();
    } catch (err) {
      console.log(err);
    }
  };

  const cycleTheme = () => {
    const order: any[] = ['light', 'dark'];
    if (user?.subscription_type === 'chaos') order.push('chaos');
    const next = order[(order.indexOf(themeName) + 1) % order.length];
    setTheme(next);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={{ paddingTop: 56, paddingHorizontal: 16, paddingBottom: 12, backgroundColor: theme.card, borderBottomWidth: 1, borderBottomColor: theme.border }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.primary }}>Pulse</Text>
            {user?.subscription_type === 'chaos' && (
              <Text style={{ fontSize: 11, color: '#e31c25', fontWeight: '600' }}>CHAOS</Text>
            )}
          </View>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <TouchableOpacity onPress={cycleTheme}>
              <Text style={{ color: theme.muted, fontSize: 13 }}>Tema</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
              <Text style={{ color: theme.muted, fontSize: 13 }}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />}
      >
        {/* Criar post */}
        <View style={{ backgroundColor: theme.card, borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: theme.border }}>
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="O que está acontecendo?"
            placeholderTextColor={theme.muted}
            multiline
            style={{ color: theme.text, minHeight: 60, textAlignVertical: 'top' }}
          />
          <TouchableOpacity
            onPress={handlePost}
            style={{ alignSelf: 'flex-end', backgroundColor: theme.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginTop: 8 }}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>Publicar</Text>
          </TouchableOpacity>
        </View>

        {/* Posts */}
        {posts.map((post) => (
          <View key={post.id} style={{ backgroundColor: theme.card, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: theme.border }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.primary, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>{post.user.name.charAt(0)}</Text>
              </View>
              <View>
                <Text style={{ color: theme.text, fontWeight: '600' }}>{post.user.name}</Text>
                <Text style={{ color: theme.muted, fontSize: 12 }}>@{post.user.username}</Text>
              </View>
            </View>

            <Text style={{ color: theme.text, marginBottom: 12 }}>{post.content}</Text>

            <View style={{ flexDirection: 'row', gap: 20 }}>
              <Text style={{ color: theme.muted }}>♥ {post.likes_count}</Text>
              <Text style={{ color: theme.muted }}>💬 {post.comments_count}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
