import supabase from '../utils/supabaseClient.js';

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const postMessage = async (req, res) => {
  const { chat_id, user_id, content } = req.body;
  const { data, error } = await supabase
    .from('messages')
    .insert([{ chat_id, user_id, content }]);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};
