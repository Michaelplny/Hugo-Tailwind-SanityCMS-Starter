#!/bin/bash
#Remember to run this script every time you add new svgs

# Get the directory of the current script
script_dir=$(realpath $(dirname "$0"))

echo "[" > "$script_dir/../../data/svg_files.json"
ls -R "$script_dir/../../assets/svg/fontawesome" | sed -e 's/^/"/' -e 's/$/",/' >> "$script_dir/../../data/svg_files.json"
sed -i '' -e '$ s/.$//' "$script_dir/../../data/svg_files.json"
echo "]" >> "$script_dir/../../data/svg_files.json"