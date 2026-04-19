-- Nigrani AI: Phase 3 Database Schema

-- 1. Create the 'transactions' table
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amount FLOAT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    device_type TEXT,
    merchant_category TEXT,
    prediction TEXT NOT NULL,
    probability FLOAT NOT NULL,
    confidence_score FLOAT NOT NULL,
    risk_level TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Add Row Level Security (optional but recommended for production)
-- ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- 3. Create Indexes for performance
CREATE INDEX IF NOT EXISTS idx_risk_level ON transactions(risk_level);
CREATE INDEX IF NOT EXISTS idx_prediction ON transactions(prediction);
CREATE INDEX IF NOT EXISTS idx_created_at ON transactions(created_at DESC);

-- 4. Enable Realtime (optional, for Phase 3/4 frontend updates)
-- ALTER PUBLICATION supabase_realtime ADD TABLE transactions;

-- Phase 6: Real Auth & User Profiles

-- 5. Create 'profiles' table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    name TEXT,
    organization TEXT,
    email TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 7. Create Policies
CREATE POLICY "Users can view their own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

-- 8. Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name, organization, email)
    VALUES (
        new.id, 
        new.raw_user_meta_data->>'full_name', 
        new.raw_user_meta_data->>'organization',
        new.email
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
