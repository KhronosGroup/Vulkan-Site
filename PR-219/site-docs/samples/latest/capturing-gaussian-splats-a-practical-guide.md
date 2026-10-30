# Capturing Gaussian Splats: A Practical Guide

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/samples/complex/render_octomap/Tutorials/capturing-gaussian-splats.html

## Table of Contents

- [1. Introduction](#_introduction)
- [2. What You’re Actually Capturing](#_what_youre_actually_capturing)
- [2._What_You’re_Actually_Capturing](#_what_youre_actually_capturing)
- [3. Capture Method 1: Photogrammetry (Video or Photo Sequence)](#_capture_method_1_photogrammetry_video_or_photo_sequence)
- [3._Capture_Method_1:_Photogrammetry_(Video_or_Photo_Sequence)](#_capture_method_1_photogrammetry_video_or_photo_sequence)
- [3.1. How It Works](#_how_it_works)
- [3.1._How_It_Works](#_how_it_works)
- [3.2. What You Need](#_what_you_need)
- [3.2._What_You_Need](#_what_you_need)
- [3.3. The Capture Process](#_the_capture_process)
- [3.3._The_Capture_Process](#_the_capture_process)
- [3.4. Processing with COLMAP](#_processing_with_colmap)
- [3.4._Processing_with_COLMAP](#_processing_with_colmap)
- [3.5. Tips for Better Results](#_tips_for_better_results)
- [3.5._Tips_for_Better_Results](#_tips_for_better_results)
- [4. Capture Method 2: SLAM (Simultaneous Localization and Mapping)](#_capture_method_2_slam_simultaneous_localization_and_mapping)
- [4._Capture_Method_2:_SLAM_(Simultaneous_Localization_and_Mapping)](#_capture_method_2_slam_simultaneous_localization_and_mapping)
- [4.1. How It Works](#_how_it_works_2)
- [4.1._How_It_Works](#_how_it_works_2)
- [4.2. What You Need](#_what_you_need_2)
- [4.2._What_You_Need](#_what_you_need_2)
- [4.3. The Capture Process with RTAB-Map](#_the_capture_process_with_rtab_map)
- [4.3._The_Capture_Process_with_RTAB-Map](#_the_capture_process_with_rtab_map)
- [5. Capture Method 3: Structured Light and Laser Scanning](#_capture_method_3_structured_light_and_laser_scanning)
- [5._Capture_Method_3:_Structured_Light_and_Laser_Scanning](#_capture_method_3_structured_light_and_laser_scanning)
- [5.1. How It Works](#_how_it_works_3)
- [5.1._How_It_Works](#_how_it_works_3)
- [5.2. What You Need](#_what_you_need_3)
- [5.2._What_You_Need](#_what_you_need_3)
- [5.3. When to Use This Method](#_when_to_use_this_method)
- [5.3._When_to_Use_This_Method](#_when_to_use_this_method)
- [6. Capture Method 4: Multi-View Stereo Rigs](#_capture_method_4_multi_view_stereo_rigs)
- [6._Capture_Method_4:_Multi-View_Stereo_Rigs](#_capture_method_4_multi_view_stereo_rigs)
- [6.1. How It Works](#_how_it_works_4)
- [6.1._How_It_Works](#_how_it_works_4)
- [6.2. What You Need](#_what_you_need_4)
- [6.2._What_You_Need](#_what_you_need_4)
- [6.3. When to Use This Method](#_when_to_use_this_method_2)
- [6.3._When_to_Use_This_Method](#_when_to_use_this_method_2)
- [7. From Capture to Gaussian Splats: The Training Pipeline](#_from_capture_to_gaussian_splats_the_training_pipeline)
- [7._From_Capture_to_Gaussian_Splats:_The_Training_Pipeline](#_from_capture_to_gaussian_splats_the_training_pipeline)
- [7.1. The Training Process](#_the_training_process)
- [7.1._The_Training_Process](#_the_training_process)
- [7.2. Available Training Tools](#_available_training_tools)
- [7.2._Available_Training_Tools](#_available_training_tools)
- [7.3. Data Format: Getting Your Capture into the Right Format](#_data_format_getting_your_capture_into_the_right_format)
- [7.3._Data_Format:_Getting_Your_Capture_into_the_Right_Format](#_data_format_getting_your_capture_into_the_right_format)
- [7.4. Training Tips](#_training_tips)
- [7.4._Training_Tips](#_training_tips)
- [8. Practical Capture Scenarios](#_practical_capture_scenarios)
- [8._Practical_Capture_Scenarios](#_practical_capture_scenarios)
- [8.1. Scenario 1: Indoor Room Scan](#_scenario_1_indoor_room_scan)
- [8.1._Scenario_1:_Indoor_Room_Scan](#_scenario_1_indoor_room_scan)
- [8.2. Scenario 2: Object Scanning](#_scenario_2_object_scanning)
- [8.2._Scenario_2:_Object_Scanning](#_scenario_2_object_scanning)
- [8.3. Scenario 3: Outdoor Environment](#_scenario_3_outdoor_environment)
- [8.3._Scenario_3:_Outdoor_Environment](#_scenario_3_outdoor_environment)
- [8.4. Scenario 4: Performance/Face Capture](#_scenario_4_performanceface_capture)
- [8.4._Scenario_4:_Performance/Face_Capture](#_scenario_4_performanceface_capture)
- [9. Quality Checklist](#_quality_checklist)
- [9._Quality_Checklist](#_quality_checklist)
- [10. Common Problems and Solutions](#_common_problems_and_solutions)
- [10._Common_Problems_and_Solutions](#_common_problems_and_solutions)
- [11. Recommended Workflows for Beginners](#_recommended_workflows_for_beginners)
- [11._Recommended_Workflows_for_Beginners](#_recommended_workflows_for_beginners)
- [12. Advanced Topics](#_advanced_topics)
- [12._Advanced_Topics](#_advanced_topics)
- [12.1. Camera Calibration](#_camera_calibration)
- [12.1._Camera_Calibration](#_camera_calibration)
- [12.2. Mask-Based Capture](#_mask_based_capture)
- [12.2._Mask-Based_Capture](#_mask_based_capture)
- [12.3. Multi-Stage Captures](#_multi_stage_captures)
- [12.3._Multi-Stage_Captures](#_multi_stage_captures)
- [12.4. Dynamic Scenes](#_dynamic_scenes)
- [12.4._Dynamic_Scenes](#_dynamic_scenes)
- [13. Exporting for Use in This Sample](#_exporting_for_use_in_this_sample)
- [13._Exporting_for_Use_in_This_Sample](#_exporting_for_use_in_this_sample)
- [13.1. Using Community Tools](#_using_community_tools)
- [13.1._Using_Community_Tools](#_using_community_tools)
- [13.2. Verifying the Export](#_verifying_the_export)
- [13.2._Verifying_the_Export](#_verifying_the_export)
- [14. Summary: From Capture to Rendering](#_summary_from_capture_to_rendering)
- [14._Summary:_From_Capture_to_Rendering](#_summary_from_capture_to_rendering)
- [15. Further Resources](#_further_resources)
- [15._Further_Resources](#_further_resources)

## Content

Table of Contents

[1. Introduction](#_introduction)
[2. What You’re Actually Capturing](#_what_youre_actually_capturing)
[3. Capture Method 1: Photogrammetry (Video or Photo Sequence)](#_capture_method_1_photogrammetry_video_or_photo_sequence)

[3.1. How It Works](#_how_it_works)
[3.2. What You Need](#_what_you_need)
[3.3. The Capture Process](#_the_capture_process)
[3.4. Processing with COLMAP](#_processing_with_colmap)
[3.5. Tips for Better Results](#_tips_for_better_results)

[4. Capture Method 2: SLAM (Simultaneous Localization and Mapping)](#_capture_method_2_slam_simultaneous_localization_and_mapping)

[4.1. How It Works](#_how_it_works_2)
[4.2. What You Need](#_what_you_need_2)
[4.3. The Capture Process with RTAB-Map](#_the_capture_process_with_rtab_map)

[5. Capture Method 3: Structured Light and Laser Scanning](#_capture_method_3_structured_light_and_laser_scanning)

[5.1. How It Works](#_how_it_works_3)
[5.2. What You Need](#_what_you_need_3)
[5.3. When to Use This Method](#_when_to_use_this_method)

[6. Capture Method 4: Multi-View Stereo Rigs](#_capture_method_4_multi_view_stereo_rigs)

[6.1. How It Works](#_how_it_works_4)
[6.2. What You Need](#_what_you_need_4)
[6.3. When to Use This Method](#_when_to_use_this_method_2)

[7. From Capture to Gaussian Splats: The Training Pipeline](#_from_capture_to_gaussian_splats_the_training_pipeline)

[7.1. The Training Process](#_the_training_process)
[7.2. Available Training Tools](#_available_training_tools)
[7.3. Data Format: Getting Your Capture into the Right Format](#_data_format_getting_your_capture_into_the_right_format)
[7.4. Training Tips](#_training_tips)

[8. Practical Capture Scenarios](#_practical_capture_scenarios)

[8.1. Scenario 1: Indoor Room Scan](#_scenario_1_indoor_room_scan)
[8.2. Scenario 2: Object Scanning](#_scenario_2_object_scanning)
[8.3. Scenario 3: Outdoor Environment](#_scenario_3_outdoor_environment)
[8.4. Scenario 4: Performance/Face Capture](#_scenario_4_performanceface_capture)

[9. Quality Checklist](#_quality_checklist)
[10. Common Problems and Solutions](#_common_problems_and_solutions)
[11. Recommended Workflows for Beginners](#_recommended_workflows_for_beginners)
[12. Advanced Topics](#_advanced_topics)

[12.1. Camera Calibration](#_camera_calibration)
[12.2. Mask-Based Capture](#_mask_based_capture)
[12.3. Multi-Stage Captures](#_multi_stage_captures)
[12.4. Dynamic Scenes](#_dynamic_scenes)

[13. Exporting for Use in This Sample](#_exporting_for_use_in_this_sample)

[13.1. Using Community Tools](#_using_community_tools)
[13.2. Verifying the Export](#_verifying_the_export)

[14. Summary: From Capture to Rendering](#_summary_from_capture_to_rendering)
[15. Further Resources](#_further_resources)

So you want to capture your own Gaussian splat scenes? Great! Whether you’re scanning a room, capturing outdoor environments, or digitizing objects, this tutorial will walk you through the process. We’ll cover the different capture methods, what hardware and software you need, and how to turn your raw data into beautiful Gaussian splats.

The good news: you probably already have the most important tool - a decent camera or smartphone. The less good news: the processing pipeline has some complexity, and getting high-quality results takes practice. But don’t worry, we’ll walk through everything step by step.

Before we dive into methods and tools, let’s clarify what we need to capture. Gaussian splat training requires understanding the 3D structure of your scene **and** its appearance from multiple viewpoints. Fundamentally, you need:

**Multiple images** of the scene from different angles. The more viewpoints, the better. Think dozens to hundreds of photos, not just 5-10.

**Camera poses** for each image - where the camera was positioned and oriented when that photo was taken. This is the 3D structure part.

**Camera parameters** - focal length, lens distortion, image resolution. Modern tools can estimate these automatically, but knowing them helps.

Optional but helpful:

**Depth information** - if you have a depth camera, this accelerates training and improves quality.

**Mask information** - defining what parts of the image contain your subject versus background.

The capture process gets you the images and camera poses. The training process turns this into Gaussian splats. Let’s look at the different ways to do the capture part.

This is the most accessible method because it works with any camera - phone, DSLR, drone, whatever. You walk around your subject taking photos (or record a video and extract frames), and software figures out where the camera was for each shot.

Photogrammetry software analyzes your images, finds common features (corners, edges, textures), and uses them to reconstruct both the camera positions and a 3D point cloud of the scene. This process is called Structure from Motion (SfM). Once you have camera poses, you can train Gaussian splats.

The software is solving a chicken-and-egg problem: to know the 3D structure, it needs camera positions. To know camera positions, it needs the 3D structure. It solves this iteratively, starting with estimates and refining them.

**Hardware:**

* 
Any camera that can take reasonably sharp photos

* 
Smartphones work great - modern phone cameras are surprisingly good

* 
DSLRs/mirrorless give you more control and better quality

* 
360° cameras work too, though processing is different

**Software:**

* 
**COLMAP** (free, open-source, industry standard for SfM)

* 
**Reality Capture** (commercial, fast, excellent quality)

* 
**Metashape** (formerly PhotoScan, commercial, photogrammetry focused)

* 
**Meshroom** (free, open-source, user-friendly interface)

Let me walk you through capturing a room:

**Step 1 - Plan your capture.** Walk around the space first. Identify problematic areas: shiny surfaces (mirrors, glass), plain textures (white walls), moving objects (people, pets, curtains). These confuse photogrammetry. Cover or remove them if possible.

**Step 2 - Set up lighting.** Consistent lighting is crucial. Close curtains to avoid changing sunlight. Turn on all lights. Avoid harsh shadows. If you’re outdoors, overcast days are actually better than bright sun - softer, more even lighting.

**Step 3 - Camera settings.** If using a phone, lock exposure and focus. On a DSLR, shoot in manual mode: ISO 400-800, aperture f/5.6-f/8 (for good depth of field), shutter fast enough to avoid blur (1/60s minimum handheld, faster is better). Shoot in RAW if possible.

**Step 4 - Capture images.** Here’s where technique matters:

Walk around your subject in overlapping circles. Imagine you’re orbiting at different heights. Take a photo every few steps, keeping 70-80% overlap between consecutive images. If you took 100 photos and every point in your scene appears in at least 10 of them, you’re doing great.

Keep the subject centered in frame. Avoid extreme angles initially (you can get creative once you have good coverage). Move smoothly - no sudden position jumps between shots.

If shooting video instead, walk **slowly**. Like, uncomfortably slowly. 1 step per second kind of slow. Extract frames every 5-10 frames later (not every single frame - too much overlap and motion blur).

For objects, place them on a turntable and rotate them while keeping the camera steady. Or keep the object still and move the camera around it. Either works.

**Step 5 - Capture enough data.** For a small object: 50-100 photos. For a room: 200-400 photos. For a large outdoor space: 500-1000+ photos. More is better, but beyond a point you’re just adding processing time.

COLMAP is the standard tool for photogrammetry. Here’s the workflow:

# 1. Feature extraction - finds interesting points in each image
colmap feature_extractor \
  --database_path database.db \
  --image_path images/ \
  --ImageReader.single_camera 1 \
  --ImageReader.camera_model SIMPLE_RADIAL

# 2. Feature matching - finds the same points across different images
colmap exhaustive_matcher \
  --database_path database.db

# 3. Structure from Motion - estimates camera poses and 3D structure
colmap mapper \
  --database_path database.db \
  --image_path images/ \
  --output_path sparse/

# 4. (Optional) Dense reconstruction - creates a dense point cloud
colmap image_undistorter \
  --image_path images/ \
  --input_path sparse/0 \
  --output_path dense/

colmap patch_match_stereo \
  --workspace_path dense/

colmap stereo_fusion \
  --workspace_path dense/ \
  --output_path dense/fused.ply

This gives you camera poses and a point cloud. Now you’re ready to train Gaussian splats.

**Texture is your friend.** Photogrammetry needs visual features to track. Plain white walls? Terrible. Textured wallpaper? Great. If capturing an object with little texture, temporarily add some - tape newspaper to it, place it on a textured surface, whatever.

**Avoid motion blur.** Blurry images confuse the feature matching. Use a fast shutter speed or good lighting to keep everything sharp.

**Watch out for reflections.** Shiny surfaces show different things from different angles, which breaks the assumptions of photogrammetry. Cover mirrors, shoot glass at angles to minimize reflections, or mask them out in post.

**Mind the scale.** Photogrammetry reconstructs relative scale, not absolute. A dollhouse and a cathedral look the same to the algorithm. Include a known-size reference object if absolute measurements matter.

**Check your coverage.** After capturing, review your photos. Did you miss any angles? Any parts of the scene that appear in fewer than 5 photos? Go back and fill those gaps.

SLAM is what robots and AR devices use to understand their environment in real-time. Unlike photogrammetry (which processes everything after capture), SLAM tracks the camera pose **while** you’re capturing. The `render_octomap` sample uses data generated by Holochip’s real-time SLAM.  Note, Holochip’s solution generates the GLTF with compressed, embedded Gaussian Splats in real-time without any extra tools required.

SLAM tracks visual features frame-to-frame, building a map of the environment while simultaneously tracking the camera’s position in that map. Modern SLAM systems can run in real-time on a laptop, giving you immediate feedback about your capture quality.

The advantage over photogrammetry? You see the reconstruction as you capture, so you know immediately if you’ve missed areas or if the tracking failed. The disadvantage? It’s more sensitive to fast motion and requires more setup.

**Hardware:**

* 
A camera with good frame rate (30+ FPS)

* 
Ideally, an RGB-D camera (color + depth) like:

Intel RealSense D435 / D455

* 
Microsoft Azure Kinect

* 
iPhone Pro or iPad Pro (with LiDAR sensor)

Or just a regular webcam/phone camera (visual SLAM only)

**Software:**

* 
**ORB-SLAM3** (open-source, state-of-the-art visual SLAM)

* 
**RTAB-Map** (open-source, designed for RGB-D cameras, user-friendly)

* 
**Open3D** (library with SLAM capabilities)

* 
**ARKit** (iOS, for iPhone/iPad with LiDAR)

* 
**ARCore** (Android, though less accurate for reconstruction)

Let’s walk through capturing a scene with RTAB-Map and an RGB-D camera:

**Step 1 - Set up your camera.** Connect your RGB-D camera (e.g., RealSense D435). Launch RTAB-Map and configure it to use your camera.

**Step 2 - Start mapping.** Click "Start" and you’ll see a live view with tracked features. As you move the camera, you’ll see the 3D map building in real-time.

**Step 3 - Capture technique.** This is different from photogrammetry:

Move **smoothly** and **slowly**. SLAM tracks features frame-to-frame, so sudden movements break tracking. Think "sliding" not "stepping."

Keep the camera roughly level.  Extreme movement is a weak point in many SLAM implementations.

Look at areas with good texture first. SLAM needs to initialize by tracking features. Starting in front of a white wall? Bad. Starting looking at a bookshelf? Good.  The easier you are on your SLAM implementation, the better it can perform.  Several professional grade solutions account for bad practices experienced in the real world.

Revisit areas - this helps SLAM "close loops" and reduce drift. If you capture a room, end where you started. SLAM will recognize it’s back at the beginning and correct any accumulated error.

Watch the tracking status in the UI. If it says "lost tracking," stop, back up slightly, and let it reacquire. Don’t continue capturing while tracking is lost.

**Step 4 - Save the map.** When done, RTAB-Map saves:

* 
Camera trajectory (poses for each frame)

* 
Point cloud reconstruction

* 
RGB-D image data

Export the camera poses and images in a format Gaussian splat trainers understand (more on this later).

For high-precision captures of smaller objects, structured light scanners and laser scanners give you submillimeter accuracy. These are specialized devices, but worth mentioning.

Structured light scanners project patterns (lines, grids, dots) onto your subject and capture how they deform. This directly gives you depth. Rotate the object (or scanner), capture from multiple angles, align the scans, and you have a complete 3D model.

Laser scanners use a laser to measure distances, rotating to scan the entire field of view. They’re more common in architecture and industrial settings.

**Hardware:**

* 
Desktop scanners: Revopoint POP 3, Creality CR-Scan, Shining 3D (consumer, $300-$1000)

* 
Professional scanners: Artec Eva, Faro Focus (professional, $10,000+)

* 
DIY: You can build structured light scanners with projectors and cameras

**Software:**

* 
Usually included with the scanner

* 
**CloudCompare** for point cloud processing

* 
**MeshLab** for mesh processing

* 
Export point clouds and camera poses for Gaussian splat training

Object scanning where precision matters - jewelry, mechanical parts, small sculptures. You get extremely accurate geometry, which helps Gaussian splat training converge faster.

Not practical for room-scale or outdoor captures. These scanners work at close range.

For professional productions, multi-camera rigs capture dozens or hundreds of synchronized views simultaneously. Think "bullet time" from The Matrix, but for 3D reconstruction.

Mount 50-200+ cameras in a geodesic dome or along rails. Synchronize their shutters. Capture all views at once. Process with photogrammetry, but since you have so many simultaneous views, reconstruction is faster and more accurate.

This is specialized equipment:

* 
Synchronized camera arrays (GoPros, machine vision cameras)

* 
Hardware trigger systems

* 
Serious computing power for processing

* 
Custom calibration workflows

Companies like Microsoft (Volumetric Video), Intel (TrueView), and various studios use these setups.

Performance capture - actors, athletes, dynamic scenes. Anywhere you need to capture a moment frozen in time from all angles.

Not for most users due to cost and complexity, but it’s how professional volumetric video is captured.

Okay, you’ve captured your scene using one of the methods above. Now you have:

* 
A collection of images

* 
Camera poses for each image

* 
(Optionally) a point cloud

How do you turn this into Gaussian splats?

Training Gaussian splats is an optimization process. It starts with a point cloud (either from your capture or random initialization), treats each point as a Gaussian splat, and iteratively adjusts the positions, rotations, scales, opacities, and colors to match your captured images.

The algorithm renders the current splats from each camera pose, compares the result to your actual captured image, and adjusts the splats to minimize the difference. Repeat for thousands of iterations, and you get photorealistic Gaussian splats.

**1. Original 3D Gaussian Splatting Implementation**

The reference implementation from INRIA:

# Clone the repo
git clone https://github.com/graphdeco-inria/gaussian-splatting --recursive

# Install dependencies
cd gaussian-splatting
conda create -n gaussian_splatting python=3.8
conda activate gaussian_splatting
pip install -r requirements.txt

# Train on your data (must be in COLMAP format)
python train.py -s /path/to/your/scene -m output/model

# Render views
python render.py -m output/model

# Export to GLTF (using community tools)
python convert_to_gltf.py -m output/model -o output/scene.gltf

**2. Nerfstudio**

Nerfstudio is a framework for training various neural rendering methods, including Gaussian splats:

# Install nerfstudio
pip install nerfstudio

# Process your images with COLMAP
ns-process-data images --data /path/to/images --output-dir /path/to/processed

# Train Gaussian splats
ns-train splatfacto --data /path/to/processed

# View in browser
ns-viewer --load-config outputs/.../config.yml

Nerfstudio is more user-friendly with great visualization tools and a web viewer.

**3. Gaussian Splatting Studio**

A GUI application that wraps the training process:

* 
Point-and-click interface

* 
Built-in COLMAP integration

* 
Real-time training preview

* 
Export options for various formats

Perfect if you don’t want to touch the command line.

**4. Luma AI** (Cloud-based)

Upload your images to Luma’s cloud service. They handle processing and training, then you download the result. Easiest option but requires internet and their service.

Training tools expect data in a specific format. The most common is COLMAP format:

scene/
  images/
    IMG_0001.jpg
    IMG_0002.jpg
    ...
  sparse/
    0/
      cameras.bin
      images.bin
      points3D.bin

If you captured with COLMAP, you already have this.

If you captured with RTAB-Map or other SLAM:

* 
Export images to `images/`

* 
Export camera poses in COLMAP format (or TUM format and convert)

* 
Some tools provide conversion scripts

If you have video:

* 
Extract frames: `ffmpeg -i video.mp4 -qscale:v 2 images/img_%04d.jpg`

* 
Run COLMAP on the frames to get camera poses

**Start with lower resolution.** Training at 1920x1080 is slow. Downsample to 960x540 for initial tests, verify quality, then do a final training run at full resolution.

**Watch the metrics.** Training tools report PSNR (Peak Signal-to-Noise Ratio) and SSIM (Structural Similarity). Higher is better. If they plateau early, something’s wrong with your capture.

**Point cloud initialization matters.** If you have a good point cloud from COLMAP or SLAM, use it. Random initialization works but takes longer.

**Iterations and learning rate.** Default settings are usually good (30,000 iterations), but you can adjust. More complex scenes might benefit from longer training.

**Densification.** During training, the algorithm adds new splats where needed and removes useless ones. This "densification" happens automatically but can be tuned.

Let’s walk through some common scenarios with specific advice.

**Best method:** Photogrammetry or RGB-D SLAM

**Hardware:** Smartphone or RGB-D camera (RealSense, iPhone with LiDAR, Android (some models))

**Process:**

Close curtains for consistent lighting

Remove or mask moving objects (people, pets, fans)

If using photogrammetry: Walk around taking 300-400 photos with 70% overlap

If using SLAM: Walk around slowly with RGB-D camera, ending where you started

Process with COLMAP or RTAB-Map

Train with nerfstudio or Gaussian splatting implementation

**Common issues:**

* 
White walls lack texture → Temporarily hang posters or place textured objects

* 
Mirrors and glass → Cover them or mask in post

* 
Windows showing outside → Mask them out or close curtains

* 
Large plain surfaces (floors) → Walk at different heights to get multiple angles

**Best method:** Photogrammetry with turntable, or structured light scanner

**Hardware:** Camera + turntable, or handheld RGB-D, or structured light scanner

**Process:**

Place object on turntable with textured (non-reflective) background

Set up even, diffuse lighting from multiple angles

If using turntable: Rotate 10° at a time, capture 36 photos for full 360°

Repeat at different heights (horizontal ring, 30° above, 30° below)

If object has top details, capture top-down views

Process with COLMAP or scanner software

Train Gaussian splats

**Common issues:**

* 
Shiny objects → Use polarized light or powder spray (removable)

* 
Transparent objects → Place on contrasting background, use back-lighting

* 
Thin structures (wires, hair) → Multiple passes from different angles

* 
Symmetrical objects → Add temporary asymmetric markers for tracking

**Best method:** Photogrammetry with drone or ground-level camera

**Hardware:** Drone with camera

**Process:**

Choose overcast day for even lighting (or consistent time if training on sunny day data)

If using drone: Fly in automated grid pattern at multiple altitudes

If ground-level: Walk around perimeter, capturing overlapping images

Capture 500-1000+ photos for large areas

Process with COLMAP or Reality Capture (better for large scenes)

Train Gaussian splats

**Common issues:**

* 
Moving vegetation (trees, grass) → Capture on calm day, or accept some blur

* 
Changing lighting (sun, clouds) → Capture quickly or on overcast day

* 
Sky/uniform areas → COLMAP struggles; mask sky or focus on ground features

* 
Scale and drift → Include ground control points with known positions

**Best method:** Multi-view stereo rig, or single-camera video with careful technique

**Hardware:** Multiple synchronized cameras, or high-frame-rate single camera

**Process (single camera):**

Have subject stay still

Move camera around them in smooth, slow orbit

Capture 200-300 frames (video at 30-60fps for 5-10 seconds)

Extract frames, process with COLMAP

Train Gaussian splats

**Process (multi-camera):**

Calibrate all cameras

Synchronize shutters

Capture single moment from all angles

Process with photogrammetry

Train Gaussian splats

**Common issues:**

* 
Subject movement → Very hard to handle; need multi-camera setup or very patient subject

* 
Hair and fine details → Need many views and high resolution

* 
Expression capture → Requires video or very fast multi-camera capture

Before training, verify you have:

* 
**Sufficient overlap** - Every point visible in 10+ images

* 
**Sharp images** - No motion blur

* 
**Consistent lighting** - No dramatic changes between shots

* 
**Good texture** - Photogrammetry needs features to track

* 
**Complete coverage** - No missing angles (especially backs of objects)

* 
**Proper exposure** - No blown-out highlights or crushed blacks

* 
**Stable capture** - Smooth motion for SLAM, no sudden camera jumps

After COLMAP/SLAM processing, check:

* 
**Camera poses look correct** - Visualize in COLMAP GUI or CloudCompare

* 
**Point cloud looks recognizable** - Should roughly resemble your scene

* 
**No obvious registration errors** - Point cloud shouldn’t be split or misaligned

* 
**Reasonable number of reconstructed cameras** - If you took 300 photos but only 50 registered, something’s wrong

**Problem:** COLMAP reconstructs very few cameras (only 20 out of 200 images)

**Solution:**

* 
Images might be too blurry → Recapture with faster shutter

* 
Insufficient overlap → Images are too different; capture with more overlap

* 
Scene too uniform → Add temporary texture or capture different subject

* 
Wrong camera model → Try different models (SIMPLE_RADIAL, PINHOLE, RADIAL)

**Problem:** Point cloud looks disconnected or has multiple copies of the same thing

**Solution:**

* 
Insufficient overlap between different parts of your capture path

* 
Include "connecting" shots that bridge the gaps

* 
Might need to capture more images showing the relationship between parts

**Problem:** SLAM lost tracking during capture

**Solution:**

* 
Movement was too fast → Recapture with slower, smoother motion

* 
Area was too featureless → Start in textured area, move to plain areas gradually

* 
Lighting was too dark or had extreme contrast → Improve lighting

**Problem:** Gaussian splat training produces blurry results

**Solution:**

* 
Camera poses might be wrong → Check COLMAP/SLAM output quality

* 
Not enough training iterations → Train longer

* 
Images are actually blurry → Recapture with better camera settings

* 
Insufficient views → Capture more images from more angles

**Problem:** Gaussian splats look good from training views but bad from novel views

**Solution:**

* 
Overfitting → Not enough training views; capture more diverse angles

* 
Poor coverage → Missing key viewpoints; recapture with better coverage

* 
Wrong camera parameters → COLMAP estimated wrong intrinsics

**Easiest, Average Quality, and Real-time**

Use Holochip’s LAMA app

Connect to the Holochip LAMA server

Observe map populated in near realtime with Gaussian Splats

Retrieve the GLTF with embedded Gaussian Splats and the GEOJSON output from the saved maps folder.

**Easiest: Smartphone + Cloud Processing**

Use phone with Luma AI app

Record video walking slowly around subject

Upload to Luma AI for processing

Download trained Gaussian splats

Convert to GLTF if needed

**Best Quality: DSLR + COLMAP + Local Training**

Use DSLR/mirrorless camera with manual settings

Capture 200-400 photos with 70-80% overlap

Process with COLMAP for camera poses

Train with nerfstudio locally

Export to GLTF

**Fastest: RGB-D Camera + RTAB-Map**

Buy Intel RealSense D435i (~$300)

Capture with RTAB-Map in real-time

Export camera poses and images

Train with Gaussian splatting implementation

Export to GLTF

If COLMAP struggles or you want more control, pre-calibrate your camera:

# Print checkerboard pattern
# Capture 20+ images of checkerboard from different angles
# Run OpenCV calibration:
python calibrate_camera.py --images calibration_images/ --output camera_params.txt

# Use these parameters in COLMAP:
colmap feature_extractor \
  --database_path database.db \
  --image_path images/ \
  --ImageReader.camera_params "f,cx,cy,k1"

Calibration is especially important for wide-angle lenses (lots of distortion) or specialized cameras.

If you want to capture an object without the background, use masks:

Capture normally

Use Photoshop, GIMP, or Segment Anything Model (SAM) to create masks for each image

Place masks in `masks/` folder (same filename as images, but .png)

Train with masks to ignore background

Result: Clean object without background clutter

For very large or complex scenes:

Capture in sections

Process each section independently with COLMAP

Merge point clouds in CloudCompare

Align camera poses

Train Gaussian splats on merged data

This keeps processing manageable for huge scenes.

Capturing moving subjects or from a moving platform (ship at sea) is hard but possible:

**Time-slice approach:** Multi-camera rig captures one moment from all angles. Process as static scene.

**Per-frame approach:** Capture video + SLAM. Train separate Gaussian splats for each frame, then morph between them. Very expensive, but produces 4D (3D + time) results.

**Sparse dynamic capture:** Capture mostly-static scene with dynamic elements. Train static Gaussian splats for background, separate dynamic models for moving parts.

This is an active research area with new techniques emerging regularly.

After training, you need to export your Gaussian splats to GLTF format to use them in the `render_octomap` sample or other Vulkan applications.

# Clone the gltf export tools
git clone https://github.com/antimatter15/splat
cd splat

# Convert from .ply (Gaussian splatting output) to GLTF
python convert.py \
  --input /path/to/point_cloud.ply \
  --output scene.gltf \
  --format gltf

# Or use the COLMAP-to-GLTF converter
python colmap_to_gltf.py \
  --colmap_dir /path/to/colmap/sparse/0 \
  --output scene.gltf

Load your GLTF in a viewer to verify:

* 
glTF Viewer (web-based)

* 
Babylon.js Sandbox (web-based)

* 
This Vulkan sample!

Check that:

* 
Splats appear in correct positions

* 
Colors look right

* 
No missing regions

* 
File size is reasonable (compression working)

Let’s trace the complete pipeline one more time:

**Plan your capture** - Choose method based on subject, hardware, and quality needs

**Capture data** - Photos, video, or RGB-D with camera poses

**Process captures** - COLMAP, RTAB-Map, or other tool to get camera poses and point cloud

**Verify quality** - Check reconstructed cameras and point cloud look correct

**Train Gaussian splats** - Run training for 20-30k iterations

**Export to GLTF** - Use conversion tools to create standardized file

**Load and render** - Use this sample or other viewer to visualize

The whole process from capture to rendering can take as little as an hour for simple objects (with cloud processing) or several days for complex scenes with high-quality local training.

The most important factors for success:

* 
**Good capture technique** - Overlap, smooth motion, even lighting

* 
**Sufficient coverage** - Every part of your scene from many angles

* 
**Quality verification** - Check each stage before moving to the next

* 
**Patience** - Training takes time; don’t rush it

**Software:**

* 
[COLMAP](https://github.com/colmap/colmap) - Structure from Motion

* 
[3D Gaussian Splatting](https://github.com/graphdeco-inria/gaussian-splatting) - Original implementation

* 
[Nerfstudio](https://github.com/nerfstudio-project/nerfstudio) - User-friendly training framework

* 
[RTAB-Map](https://github.com/introlab/rtabmap) - RGB-D SLAM

* 
[ORB-SLAM3](https://github.com/raulmur/ORB_SLAM3) - Visual SLAM

**Tutorials:**

* 
Original 3DGS paper: "3D Gaussian Splatting for Real-Time Radiance Field Rendering"

* 
COLMAP documentation: Excellent tutorials on photogrammetry

* 
Nerfstudio documentation: Great getting-started guides

**Communities:**

* 
r/photogrammetry on Reddit

* 
3DGS Discord servers

* 
COLMAP discussions on GitHub

**Related Tutorials:**

* 
[Gaussian Splats Rendering Tutorial](gaussian-splats-rendering.adoc) - How to render what you’ve captured

* 
[render_octomap Sample README](../README.adoc)
