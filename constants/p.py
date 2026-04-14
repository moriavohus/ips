import os

def generate_directory_tree(start_path, output_file, exclude_dirs=None):
    """
    Generates a directory tree structure and writes it to the output file.
    """
    if exclude_dirs is None:
        exclude_dirs = ['node_modules', '.git', 'dist', 'debug_dump', 'docs',
                        'webpack', '.cache', '.parcel-cache', 'build', '.next',
                        '__pycache__', '.nuxt', 'coverage', '.turbo', '.svelte-kit']
    
    output_file.write("# Project Directory Structure\n\n")
    
    for root, dirs, files in os.walk(start_path):
        # Skip excluded directories
        for exclude_dir in exclude_dirs:
            if exclude_dir in dirs:
                dirs.remove(exclude_dir)
        
        # Calculate the level for indentation
        level = root.replace(start_path, '').count(os.sep)
        indent = '  ' * level
        
        # Print the current directory
        rel_path = os.path.relpath(root, start_path)
        if rel_path == '.':
            output_file.write(f"{indent}📁 ./\n")
        else:
            dir_name = os.path.basename(root)
            output_file.write(f"{indent}📁 {dir_name}/\n")
        
        # Print files in the current directory
        sub_indent = '  ' * (level + 1)
        for file in sorted(files):
            if file.endswith(('.tsx', '.ts', '.json', '.js', '.css', '.html')):
                output_file.write(f"{sub_indent}📄 {file}\n")
    
    output_file.write("\n\n# File Contents\n\n")

# Текущая директория
current_directory = os.getcwd()

# Имя выходного файла
output_file = 'files_with_code.txt'

# Открываем файл для записи
with open(output_file, 'w', encoding='utf-8') as output:
    # Сначала генерируем дерево каталогов
    generate_directory_tree(current_directory, output)
    
    # Проходим по всем файлам и директориям в текущей папке и подпапках
    for root, dirs, files in os.walk(current_directory):
        exclude = ['node_modules', '.git', 'dist', 'debug_dump', 'docs',
                   'webpack', '.cache', '.parcel-cache', 'build', '.next',
                   '__pycache__', '.nuxt', 'coverage', '.turbo', '.svelte-kit']
        dirs[:] = [d for d in dirs if d not in exclude]

        for filename in files:
            if filename.endswith('.tsx') or filename.endswith('.ts') or filename.endswith('.json') or filename.endswith('.js') or filename.endswith('.css') or filename.endswith('.html'):
                if "package-lock" in filename:
                    continue
                # Получаем относительный путь к файлу
                rel_path = os.path.relpath(os.path.join(root, filename), current_directory)
                
                # Записываем название файла с путем в текстовый файл
                output.write(f'File: {rel_path}\n')
                output.write('='*80 + '\n')  # Разделитель для лучшей читаемости

                # Полный путь к файлу для чтения содержимого
                file_path = os.path.join(root, filename)
                
                # Открываем файл и записываем его содержимое
                try:
                    with open(file_path, 'r', encoding='utf-8') as file:
                        code = file.read()
                        output.write(code + '\n\n')
                        output.write('-'*80 + '\n\n')  # Разделитель между файлами
                except Exception as e:
                    output.write(f'Не удалось прочитать файл {rel_path}: {e}\n\n')
                    output.write('-'*80 + '\n\n')

print(f'Дерево каталогов и код файлов записаны в {output_file}')
