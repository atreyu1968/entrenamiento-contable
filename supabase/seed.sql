-- Insert admin profile
INSERT INTO profiles (
  user_id,
  full_name,
  role
) VALUES (
  '00000000-0000-0000-0000-000000000000'::uuid,
  'Administrador',
  'admin'
);

-- Insert demo exercises
INSERT INTO exercises (
  title,
  description,
  entries,
  solution,
  auto_correct
) VALUES (
  'Compra de mercaderías con IGIC',
  'Registra la compra de mercaderías por valor de 1.000€ más IGIC general (7%). El pago se realiza mediante transferencia bancaria.',
  '[
    {"id": "1.1", "date": "2024-03-14", "description": "", "accountCode": "", "debit": 0, "credit": 0},
    {"id": "1.2", "date": "2024-03-14", "description": "", "accountCode": "", "debit": 0, "credit": 0}
  ]'::jsonb,
  '[
    {"id": "1.1", "date": "2024-03-14", "description": "Compra de mercaderías", "accountCode": "600", "debit": 1000, "credit": 0},
    {"id": "1.2", "date": "2024-03-14", "description": "IGIC soportado", "accountCode": "472", "debit": 70, "credit": 0},
    {"id": "1.3", "date": "2024-03-14", "description": "Pago mediante transferencia", "accountCode": "572", "debit": 0, "credit": 1070}
  ]'::jsonb,
  true
);