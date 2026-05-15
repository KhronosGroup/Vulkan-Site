# Migrating to Modern Asset Formats: glTF and KTX2

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/15_GLTF_KTX2_Migration.html

## Table of Contents

- [Introduction](#_introduction)
- [Understanding glTF](#_understanding_gltf)
- [What is glTF?](#_what_is_gltf)
- [What_is_glTF?](#_what_is_gltf)
- [Comparing OBJ and glTF](#_comparing_obj_and_gltf)
- [Comparing_OBJ_and_glTF](#_comparing_obj_and_gltf)
- [Understanding KTX2](#_understanding_ktx2)
- [What is KTX2?](#_what_is_ktx2)
- [What_is_KTX2?](#_what_is_ktx2)
- [Comparing PNG/JPEG and KTX2](#_comparing_pngjpeg_and_ktx2)
- [Comparing_PNG/JPEG_and_KTX2](#_comparing_pngjpeg_and_ktx2)
- [Migrating from tinyobjloader to tinygltf](#_migrating_from_tinyobjloader_to_tinygltf)
- [Migrating_from_tinyobjloader_to_tinygltf](#_migrating_from_tinyobjloader_to_tinygltf)
- [Setting Up tinygltf](#_setting_up_tinygltf)
- [Setting_Up_tinygltf](#_setting_up_tinygltf)
- [Loading a glTF Model](#_loading_a_gltf_model)
- [Loading_a_glTF_Model](#_loading_a_gltf_model)
- [Advanced glTF Features](#_advanced_gltf_features)
- [Advanced_glTF_Features](#_advanced_gltf_features)
- [Migrating_from_stb_image_to_KTX](#_migrating_from_stb_image_to_ktx)
- [Setting Up KTX](#_setting_up_ktx)
- [Setting_Up_KTX](#_setting_up_ktx)
- [Loading a KTX2 Texture](#_loading_a_ktx2_texture)
- [Loading_a_KTX2_Texture](#_loading_a_ktx2_texture)
- [Advanced KTX Features](#_advanced_ktx_features)
- [Advanced_KTX_Features](#_advanced_ktx_features)
- [Handling Mipmaps](#_handling_mipmaps)
- [Using Compressed Texture Formats](#_using_compressed_texture_formats)
- [Using_Compressed_Texture_Formats](#_using_compressed_texture_formats)
- [Handling Cubemaps and Texture Arrays](#_handling_cubemaps_and_texture_arrays)
- [Handling_Cubemaps_and_Texture_Arrays](#_handling_cubemaps_and_texture_arrays)
- [Converting Assets to glTF and KTX2](#_converting_assets_to_gltf_and_ktx2)
- [Converting_Assets_to_glTF_and_KTX2](#_converting_assets_to_gltf_and_ktx2)
- [Converting OBJ to glTF](#_converting_obj_to_gltf)
- [Converting_OBJ_to_glTF](#_converting_obj_to_gltf)
- [Working with KTX2 Files](#_working_with_ktx2_files)
- [Working_with_KTX2_Files](#_working_with_ktx2_files)
- [Creating KTX2 Files](#_creating_ktx2_files)
- [Creating_KTX2_Files](#_creating_ktx2_files)
- [Using the KTX-Software Tools](#_using_the_ktx_software_tools)
- [Using_the_KTX-Software_Tools](#_using_the_ktx_software_tools)
- [Using the KTX Library API](#_using_the_ktx_library_api)
- [Using_the_KTX_Library_API](#_using_the_ktx_library_api)
- [Using Image Editing Software](#_using_image_editing_software)
- [Using_Image_Editing_Software](#_using_image_editing_software)
- [Converting from Other Formats to KTX2](#_converting_from_other_formats_to_ktx2)
- [Converting_from_Other_Formats_to_KTX2](#_converting_from_other_formats_to_ktx2)
- [From PNG/JPEG/TIFF](#_from_pngjpegtiff)
- [From DDS (DirectX Texture Format)](#_from_dds_directx_texture_format)
- [From_DDS_(DirectX_Texture_Format)](#_from_dds_directx_texture_format)
- [From HDR/EXR (High Dynamic Range Formats)](#_from_hdrexr_high_dynamic_range_formats)
- [From_HDR/EXR_(High_Dynamic_Range_Formats)](#_from_hdrexr_high_dynamic_range_formats)
- [From PSD (Photoshop)](#_from_psd_photoshop)
- [From_PSD_(Photoshop)](#_from_psd_photoshop)
- [Optimizing KTX2 Files](#_optimizing_ktx2_files)
- [Optimizing_KTX2_Files](#_optimizing_ktx2_files)
- [Compression Options](#_compression_options)
- [Mipmap Generation](#_mipmap_generation)
- [Metadata](#_metadata)
- [Tools for Working with KTX2 Files](#_tools_for_working_with_ktx2_files)
- [Tools_for_Working_with_KTX2_Files](#_tools_for_working_with_ktx2_files)
- [Command-line Tools](#_command_line_tools)
- [Libraries and SDKs](#_libraries_and_sdks)
- [Libraries_and_SDKs](#_libraries_and_sdks)
- [Viewers and Debuggers](#_viewers_and_debuggers)
- [Viewers_and_Debuggers](#_viewers_and_debuggers)
- [Integration with Game Engines](#_integration_with_game_engines)
- [Integration_with_Game_Engines](#_integration_with_game_engines)
- [Converting Images to KTX2](#_converting_images_to_ktx2)
- [Converting_Images_to_KTX2](#_converting_images_to_ktx2)
- [Conclusion](#_conclusion)

## Content

In previous chapters, we’ve been using tinyobjloader to load 3D models in the Wavefront OBJ format and stb_image to load textures in common image formats like PNG and JPEG. While these libraries and formats are simple and widely supported, modern graphics applications often benefit from more advanced asset formats.

In this chapter, we’ll explore how to migrate from:

Wavefront OBJ (loaded with tinyobjloader) to glTF (loaded with tinygltf)

Common image formats like PNG (loaded with stb_image) to KTX2 (loaded with the KTX library)

This migration offers several advantages:

* 
**More comprehensive model data**: glTF supports animations, skeletal rigs, PBR materials, and more

* 
**GPU-optimized textures**: KTX2 supports compressed texture formats, mipmaps, and other GPU-friendly features

* 
**Industry standard**: Both glTF and KTX2 are Khronos standards designed specifically for modern graphics APIs

Let’s dive into the migration process and see how to adapt our Vulkan application to use these modern formats.

[glTF](https://www.khronos.org/gltf/) (GL Transmission Format) is a royalty-free specification for the efficient transmission and loading of 3D scenes and models. Developed by the Khronos Group, glTF is designed to be a "JPEG for 3D" - a common publishing format for 3D content.

Key features of glTF include:

* 
**Compact file size**: Binary data is stored efficiently

* 
**Fast loading**: Minimizes processing needed at load time

* 
**Complete 3D scene representation**: Includes meshes, materials, textures, animations, and more

* 
**Runtime-ready**: Data is stored in formats that can be directly used by the GPU

* 
**Extensible**: The format can be extended with new capabilities

Let’s compare the OBJ format with glTF:

| Feature | OBJ | glTF |
| --- | --- | --- |
| File format | Text-based | JSON + binary data (GLB option for single file) |
| Supported data | Geometry, basic materials, texture coordinates | Geometry, PBR materials, animations, skeletons, scenes, cameras, etc. |
| Material system | Basic (MTL files) | Physically-Based Rendering (PBR) |
| Animation support | None | Keyframe and skeletal animations |
| Coordinate system | Right-handed | Right-handed, Y-up |
| Industry adoption | Legacy standard | Modern standard for real-time 3D |

[KTX2](https://www.khronos.org/ktx/) (Khronos Texture 2.0) is a container file format for storing texture data optimized for GPU usage. It’s designed to work efficiently with modern graphics APIs like Vulkan, OpenGL, and DirectX.

Key features of KTX2 include:

* 
**GPU-ready formats**: Supports all GPU texture formats including compressed formats

* 
**Mipmap storage**: Efficiently stores complete mipmap chains

* 
**Metadata**: Includes information about the texture’s properties

* 
**Supercompression**: Supports additional compression like Basis Universal

* 
**Direct uploads**: Data can often be uploaded directly to the GPU without processing

Let’s compare traditional image formats with KTX2:

| Feature | PNG/JPEG | KTX2 |
| --- | --- | --- |
| File format | General-purpose image format | GPU-optimized texture container |
| Compression | General-purpose (PNG) or lossy (JPEG) | GPU texture compression (BC, ETC, ASTC) + supercompression |
| Mipmaps | Not supported | Built-in mipmap chain support |
| GPU upload | Requires conversion | Can be directly uploaded to GPU |
| Metadata | Limited | Comprehensive texture metadata |
| Supported features | Basic 2D images | All GPU texture types (2D, 3D, cubemaps, arrays) |

For loading glTF models (instead of obj) we’ll be using the open source [headery only C++ tiny glTF library](https://github.com/syoyo/tinygltf).

First, we need to include the tinygltf library instead of tinyobjloader:

// Replace this:
#define TINYOBJLOADER_IMPLEMENTATION
#include 

// With this:
#define TINYGLTF_IMPLEMENTATION
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include 

Note that tinygltf uses stb_image internally for image loading, but we’ll be replacing the texture loading code with KTX2 later.

Now, let’s modify our `loadModel()` function to use tinygltf instead of tinyobjloader:

void loadModel() {
    // Use tinygltf to load the model instead of tinyobjloader
    tinygltf::Model model;
    tinygltf::TinyGLTF loader;
    std::string err;
    std::string warn;

    bool ret = loader.LoadASCIIFromFile(&model, &err, &warn, MODEL_PATH);

    if (!warn.empty()) {
        std::cout  uniqueVertices{};

    for (const auto& mesh : model.meshes) {
        for (const auto& primitive : mesh.primitives) {
            // Get indices
            const tinygltf::Accessor& indexAccessor = model.accessors[primitive.indices];
            const tinygltf::BufferView& indexBufferView = model.bufferViews[indexAccessor.bufferView];
            const tinygltf::Buffer& indexBuffer = model.buffers[indexBufferView.buffer];

            // Get vertex positions
            const tinygltf::Accessor& posAccessor = model.accessors[primitive.attributes.at("POSITION")];
            const tinygltf::BufferView& posBufferView = model.bufferViews[posAccessor.bufferView];
            const tinygltf::Buffer& posBuffer = model.buffers[posBufferView.buffer];

            // Get texture coordinates if available
            bool hasTexCoords = primitive.attributes.find("TEXCOORD_0") != primitive.attributes.end();
            const tinygltf::Accessor* texCoordAccessor = nullptr;
            const tinygltf::BufferView* texCoordBufferView = nullptr;
            const tinygltf::Buffer* texCoordBuffer = nullptr;

            if (hasTexCoords) {
                texCoordAccessor = &model.accessors[primitive.attributes.at("TEXCOORD_0")];
                texCoordBufferView = &model.bufferViews[texCoordAccessor->bufferView];
                texCoordBuffer = &model.buffers[texCoordBufferView->buffer];
            }

            // Process vertices
            for (size_t i = 0; i (&posBuffer.data[posBufferView.byteOffset + posAccessor.byteOffset + i * 12]);
                vertex.pos = {pos[0], pos[1], pos[2]};

                // Get texture coordinates if available
                if (hasTexCoords) {
                    const float* texCoord = reinterpret_cast(&texCoordBuffer->data[texCoordBufferView->byteOffset + texCoordAccessor->byteOffset + i * 8]);
                    vertex.texCoord = {texCoord[0], 1.0f - texCoord[1]};
                } else {
                    vertex.texCoord = {0.0f, 0.0f};
                }

                // Set default color
                vertex.color = {1.0f, 1.0f, 1.0f};

                // Add vertex if unique
                if (!uniqueVertices.contains(vertex)) {
                    uniqueVertices[vertex] = static_cast(vertices.size());
                    vertices.push_back(vertex);
                }
            }

            // Process indices
            const unsigned char* indexData = &indexBuffer.data[indexBufferView.byteOffset + indexAccessor.byteOffset];

            // Handle different index component types
            if (indexAccessor.componentType == TINYGLTF_COMPONENT_TYPE_UNSIGNED_SHORT) {
                const uint16_t* indices16 = reinterpret_cast(indexData);
                for (size_t i = 0; i (indexData);
                for (size_t i = 0; i (indexData);
                for (size_t i = 0; i 

The key differences in this implementation compared to the tinyobjloader version are:

**Data structure**: glTF uses a more complex data structure with accessors, buffer views, and buffers

**Attribute access**: We need to navigate through these structures to access vertex data

**Multiple meshes and primitives**: glTF models can contain multiple meshes, each with multiple primitives

**Component types**: We need to handle different index component types (8-bit, 16-bit, 32-bit)

While our basic implementation only extracts geometry and texture coordinates, glTF supports many more features that you might want to use:

* 
**Materials**: Access PBR material properties through `primitive.material`

* 
**Animations**: Process animation data in `model.animations`

* 
**Skeletons**: Handle skeletal data in `model.skins`

* 
**Scenes and nodes**: Process scene hierarchy through `model.scenes` and `model.nodes`

For a complete application, you would typically process these additional features to take full advantage of glTF.

For loading KTX files (instead of formats like png or jpeg) we’ll be using the open source [KTX (Khronos Texture) Library and Tools](https://github.com/KhronosGroup/KTX-Software).

First, we need to include the KTX library:

// Replace this:
#define STB_IMAGE_IMPLEMENTATION
#include 

// With this:
#include 

Now, let’s modify our `createTextureImage()` function to use KTX instead of stb_image:

void createTextureImage() {
    // Load KTX2 texture instead of using stb_image
    ktxTexture* kTexture;
    KTX_error_code result = ktxTexture_CreateFromNamedFile(
        TEXTURE_PATH.c_str(),
        KTX_TEXTURE_CREATE_LOAD_IMAGE_DATA_BIT,
        &kTexture);

    if (result != KTX_SUCCESS) {
        throw std::runtime_error("failed to load ktx texture image!");
    }

    // Get texture dimensions and data
    uint32_t texWidth = kTexture->baseWidth;
    uint32_t texHeight = kTexture->baseHeight;
    ktx_size_t imageSize = ktxTexture_GetImageSize(kTexture, 0);
    ktx_uint8_t* ktxTextureData = ktxTexture_GetData(kTexture);

    // Create staging buffer
    vk::raii::Buffer stagingBuffer({});
    vk::raii::DeviceMemory stagingBufferMemory({});
    createBuffer(imageSize, vk::BufferUsageFlagBits::eTransferSrc, vk::MemoryPropertyFlagBits::eHostVisible | vk::MemoryPropertyFlagBits::eHostCoherent, stagingBuffer, stagingBufferMemory);

    // Copy texture data to staging buffer
    void* data = stagingBufferMemory.mapMemory(0, imageSize);
    memcpy(data, ktxTextureData, imageSize);
    stagingBufferMemory.unmapMemory();

    // Determine the Vulkan format from KTX format
    vk::Format textureFormat = vk::Format::eR8G8B8A8Srgb; // Default format, should be determined from KTX metadata

    // Create the texture image
    createImage(texWidth, texHeight, textureFormat, vk::ImageTiling::eOptimal,
               vk::ImageUsageFlagBits::eTransferDst | vk::ImageUsageFlagBits::eSampled,
               vk::MemoryPropertyFlagBits::eDeviceLocal, textureImage, textureImageMemory);

    // Copy data from staging buffer to texture image
    transitionImageLayout(textureImage, vk::ImageLayout::eUndefined, vk::ImageLayout::eTransferDstOptimal);
    copyBufferToImage(stagingBuffer, textureImage, texWidth, texHeight);
    transitionImageLayout(textureImage, vk::ImageLayout::eTransferDstOptimal, vk::ImageLayout::eShaderReadOnlyOptimal);

    // Cleanup KTX resources
    ktxTexture_Destroy(kTexture);
}

The key differences in this implementation compared to the stb_image version are:

**Loading API**: We use the KTX API to load the texture

**Texture metadata**: KTX provides metadata about the texture’s properties

**Resource cleanup**: We need to explicitly destroy the KTX texture object

This basic implementation only handles simple 2D textures, but KTX2 supports many more features:

KTX2 files can contain pre-generated mipmaps. Here’s how to use them:

// Get mipmap levels
uint32_t mipLevels = kTexture->numLevels;

// Create image with mipmap support
vk::ImageCreateInfo imageInfo{
    // ... other parameters ...
    .mipLevels = mipLevels,
    // ... other parameters ...
};

// Copy each mip level
for (uint32_t i = 0; i 

KTX2 supports GPU texture compression formats. Here’s how to handle them:

// Determine the Vulkan format from KTX format
vk::Format textureFormat;
switch (kTexture->vkFormat) {
    case VK_FORMAT_BC7_SRGB_BLOCK:
        textureFormat = vk::Format::eBc7SrgbBlock;
        break;
    case VK_FORMAT_BC5_UNORM_BLOCK:
        textureFormat = vk::Format::eBc5UnormBlock;
        break;
    // ... other format mappings ...
    default:
        textureFormat = vk::Format::eR8G8B8A8Srgb;
        break;
}

KTX2 can store cubemaps and texture arrays:

// Check if the texture is a cubemap
bool isCubemap = kTexture->isCubemap;

// Get the number of layers
uint32_t layerCount = kTexture->numLayers;

// Create appropriate image
vk::ImageCreateInfo imageInfo{
    // ... other parameters ...
    .imageType = vk::ImageType::e2D,
    .arrayLayers = layerCount,
    .flags = isCubemap ? vk::ImageCreateFlagBits::eCubeCompatible : vk::ImageCreateFlags(),
    // ... other parameters ...
};

To convert existing OBJ files to glTF, you can use various tools:

* 
**Blender**: Open the OBJ file and export as glTF

* 
**obj2gltf**: A command-line tool for converting OBJ to glTF

* 
**assimp**: A library that can convert between various 3D formats

Example using obj2gltf:

obj2gltf -i model.obj -o model.gltf

There are several ways to create KTX2 files:

The KTX-Software package provides command-line tools for creating KTX2 files:

* 
**toktx**: The primary tool for creating KTX2 files from existing images

Basic usage:

# Create a basic KTX2 file
toktx texture.ktx2 texture.png

# Create a KTX2 file with mipmaps
toktx --mipmap texture.ktx2 texture.png

# Create a KTX2 file with Basis Universal compression
toktx --bcmp texture.ktx2 texture.png

# Create a KTX2 file with specific GPU compression format (BC7)
toktx --bcmp --format BC7_RGBA texture.ktx2 texture.png

# Create a cubemap KTX2 file
toktx --cubemap cubemap.ktx2 posx.png negx.png posy.png negy.png posz.png negz.png

You can also create KTX2 files programmatically using the KTX library API:

#include 

// Create a new KTX2 texture
ktxTexture2* texture;
ktxTextureCreateInfo createInfo = {
    .vkFormat = VK_FORMAT_R8G8B8A8_SRGB,
    .baseWidth = 512,
    .baseHeight = 512,
    .baseDepth = 1,
    .numDimensions = 2,
    .numLevels = 1,
    .numLayers = 1,
    .numFaces = 1,
    .isArray = KTX_FALSE,
    .generateMipmaps = KTX_FALSE
};

KTX_error_code result = ktxTexture2_Create(&createInfo, KTX_TEXTURE_CREATE_ALLOC_STORAGE, &texture);

// Set image data
uint32_t* imageData = new uint32_t[512 * 512];
// ... fill image data ...
ktxTexture_SetImageFromMemory(ktxTexture(texture), 0, 0, 0, imageData, 512 * 512 * 4);

// Write to file
ktxTexture_WriteToNamedFile(ktxTexture(texture), "output.ktx2");

// Clean up
ktxTexture_Destroy(ktxTexture(texture));
delete[] imageData;

Some image editing and 3D modeling software can export directly to KTX2:

* 
**Substance Designer**: Can export textures directly to KTX2 format

* 
**Blender**: With plugins, can export textures to KTX2

* 
**GIMP**: With the KTX plugin, can save images as KTX2

KTX2 files can be created from various popular image formats:

The simplest conversion is from standard image formats using toktx:

# Convert PNG to KTX2
toktx texture.ktx2 texture.png

# Convert JPEG to KTX2
toktx texture.ktx2 texture.jpg

# Convert TIFF to KTX2
toktx texture.ktx2 texture.tiff

DDS is another GPU-optimized texture format commonly used with DirectX:

# Using texconv to convert DDS to PNG first
texconv -ft png texture.dds

# Then convert PNG to KTX2
toktx texture.ktx2 texture.png

Alternatively, you can use the Khronos Texture Tools:

ktx2ktx2 --convert texture.dds texture.ktx2

For HDR textures:

# Convert HDR to KTX2
toktx --hdr texture.ktx2 texture.hdr

# Convert EXR to KTX2 (may require intermediate conversion)
toktx --hdr texture.ktx2 texture.exr

For Photoshop files:

# Export PSD as PNG first
# Then convert to KTX2
toktx texture.ktx2 texture.png

To get the most out of KTX2 files, consider these optimization techniques:

KTX2 supports various compression methods:

# Basis Universal compression (highly portable)
toktx --bcmp texture.ktx2 texture.png

# ASTC compression (good for mobile)
toktx --format ASTC_4x4_RGBA texture.ktx2 texture.png

# BC7 compression (good for desktop)
toktx --format BC7_RGBA texture.ktx2 texture.png

# ETC2 compression (good for Android)
toktx --format ETC2_RGBA texture.ktx2 texture.png

Mipmaps improve rendering performance and quality:

# Generate mipmaps
toktx --mipmap texture.ktx2 texture.png

# Generate mipmaps with specific filter
toktx --mipmap --filter lanczos texture.ktx2 texture.png

KTX2 files can include metadata:

# Add key-value metadata
toktx --mipmap --key "author" --value "Your Name" texture.ktx2 texture.png

Several tools are available for working with KTX2 files:

* 
**KTX-Software Suite**:

* 
`toktx`: Create KTX2 files

* 
`ktx2ktx2`: Convert between KTX versions

* 
`ktxinfo`: Display information about KTX files

* 
`ktxsc`: Apply supercompression to KTX2 files

* 
`ktxunpack`: Unpack a KTX file to individual images

* 
**KTX-Software Library**: C/C++ library for reading, writing, and processing KTX files

* 
**libktx**: The core library used by KTX-Software

* 
**Basis Universal**: Compression technology used in KTX2

* 
**Vulkan SDK**: Includes KTX tools and libraries

* 
**glTF-Transform**: JavaScript library that can process KTX2 textures in glTF files

* 
**KTX Load Test**: Part of KTX-Software, for viewing KTX files

* 
**RenderDoc**: Graphics debugger that can inspect KTX2 textures

* 
**Khronos Texture Tools**: Includes viewers for KTX files

* 
**glTF Viewer**: Many glTF viewers support KTX2 textures

* 
**Unity**: Supports KTX2 through plugins

* 
**Unreal Engine**: Supports KTX2 through plugins

* 
**Godot**: Has KTX2 support in development

* 
**Three.js**: Supports KTX2 textures

* 
**Babylon.js**: Supports KTX2 textures

To convert existing image files to KTX2, you can use:

* 
**toktx**: A command-line tool included with the KTX-Software package

* 
**KTX-Software**: A library with tools for creating and manipulating KTX files

Example using toktx to create a KTX2 file with Basis Universal compression:

toktx --bcmp texture.ktx2 texture.png

Migrating from OBJ/PNG to glTF/KTX2 brings significant benefits for modern graphics applications:

* 
**Better performance**: Optimized formats for GPU usage

* 
**More features**: Support for advanced 3D features and texture formats

* 
**Industry standards**: Formats designed specifically for modern graphics APIs

While the migration requires some code changes, the benefits in terms of performance, features, and future-proofing make it worthwhile for serious graphics applications.

[C++ code](_attachments/35_gltf_ktx.cpp)
