# Formats

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/formats.html

## Table of Contents

- [Format Definition](#formats-definition)
- [Compatible Formats of Planes of Multi-Planar Formats](#formats-compatible-planes)
- [Compatible_Formats_of_Planes_of_Multi-Planar_Formats](#formats-compatible-planes)
- [Compatible Formats for Depth-Stencil to/from Color Copies](#formats-compatible-zs-color)
- [Compatible_Formats_for_Depth-Stencil_to/from_Color_Copies](#formats-compatible-zs-color)
- [Multi-Planar Format Image Aspect](#formats-multiplanar-image-aspect)
- [Multi-Planar_Format_Image_Aspect](#formats-multiplanar-image-aspect)
- [Packed Formats](#formats-packed)
- [Identification of Formats](#_identification_of_formats)
- [Identification_of_Formats](#_identification_of_formats)
- [Representation and Texel Block Size](#texel-block-size)
- [Representation_and_Texel_Block_Size](#texel-block-size)
- [Depth/Stencil Formats](#formats-depth-stencil)
- [Format Compatibility Classes](#formats-compatibility-classes)
- [Format_Compatibility_Classes](#formats-compatibility-classes)
- [Size Compatibility](#formats-size-compatibility)
- [Format Properties](#formats-properties)
- [Potential Format Features](#potential-format-features)
- [Potential_Format_Features](#potential-format-features)
- [Required Format Support](#features-required-format-support)
- [Required_Format_Support](#features-required-format-support)
- [Formats Without Shader Storage Format](#formats-without-shader-storage-format)
- [Formats_Without_Shader_Storage_Format](#formats-without-shader-storage-format)
- [Depth Comparison Format Support](#_depth_comparison_format_support)
- [Depth_Comparison_Format_Support](#_depth_comparison_format_support)
- [Format Feature Dependent Usage Flags](#format-feature-dependent-usage-flags)
- [Format_Feature_Dependent_Usage_Flags](#format-feature-dependent-usage-flags)
- [Tensor Format Support](#features-required-tensor-format-support)
- [Tensor_Format_Support](#features-required-tensor-format-support)

## Content

Supported buffer and image formats **may** vary across implementations.
A minimum set of format features are guaranteed, but others **must** be
explicitly queried before use to ensure they are supported by the
implementation.

The features for the set of formats ([VkFormat](#VkFormat)) supported by the
implementation are queried individually using the
[vkGetPhysicalDeviceFormatProperties](#vkGetPhysicalDeviceFormatProperties) command.

The following image formats **can** be passed to, and **may** be returned from
Vulkan commands.
The memory required to store each format is discussed with that format, and
also summarized in the [Representation and Texel Block Size](#texel-block-size) section and the [Compatible formats](#formats-compatibility) table.

// Provided by VK_VERSION_1_0
typedef enum VkFormat {
    VK_FORMAT_UNDEFINED = 0,
    VK_FORMAT_R4G4_UNORM_PACK8 = 1,
    VK_FORMAT_R4G4B4A4_UNORM_PACK16 = 2,
    VK_FORMAT_B4G4R4A4_UNORM_PACK16 = 3,
    VK_FORMAT_R5G6B5_UNORM_PACK16 = 4,
    VK_FORMAT_B5G6R5_UNORM_PACK16 = 5,
    VK_FORMAT_R5G5B5A1_UNORM_PACK16 = 6,
    VK_FORMAT_B5G5R5A1_UNORM_PACK16 = 7,
    VK_FORMAT_A1R5G5B5_UNORM_PACK16 = 8,
    VK_FORMAT_R8_UNORM = 9,
    VK_FORMAT_R8_SNORM = 10,
    VK_FORMAT_R8_USCALED = 11,
    VK_FORMAT_R8_SSCALED = 12,
    VK_FORMAT_R8_UINT = 13,
    VK_FORMAT_R8_SINT = 14,
    VK_FORMAT_R8_SRGB = 15,
    VK_FORMAT_R8G8_UNORM = 16,
    VK_FORMAT_R8G8_SNORM = 17,
    VK_FORMAT_R8G8_USCALED = 18,
    VK_FORMAT_R8G8_SSCALED = 19,
    VK_FORMAT_R8G8_UINT = 20,
    VK_FORMAT_R8G8_SINT = 21,
    VK_FORMAT_R8G8_SRGB = 22,
    VK_FORMAT_R8G8B8_UNORM = 23,
    VK_FORMAT_R8G8B8_SNORM = 24,
    VK_FORMAT_R8G8B8_USCALED = 25,
    VK_FORMAT_R8G8B8_SSCALED = 26,
    VK_FORMAT_R8G8B8_UINT = 27,
    VK_FORMAT_R8G8B8_SINT = 28,
    VK_FORMAT_R8G8B8_SRGB = 29,
    VK_FORMAT_B8G8R8_UNORM = 30,
    VK_FORMAT_B8G8R8_SNORM = 31,
    VK_FORMAT_B8G8R8_USCALED = 32,
    VK_FORMAT_B8G8R8_SSCALED = 33,
    VK_FORMAT_B8G8R8_UINT = 34,
    VK_FORMAT_B8G8R8_SINT = 35,
    VK_FORMAT_B8G8R8_SRGB = 36,
    VK_FORMAT_R8G8B8A8_UNORM = 37,
    VK_FORMAT_R8G8B8A8_SNORM = 38,
    VK_FORMAT_R8G8B8A8_USCALED = 39,
    VK_FORMAT_R8G8B8A8_SSCALED = 40,
    VK_FORMAT_R8G8B8A8_UINT = 41,
    VK_FORMAT_R8G8B8A8_SINT = 42,
    VK_FORMAT_R8G8B8A8_SRGB = 43,
    VK_FORMAT_B8G8R8A8_UNORM = 44,
    VK_FORMAT_B8G8R8A8_SNORM = 45,
    VK_FORMAT_B8G8R8A8_USCALED = 46,
    VK_FORMAT_B8G8R8A8_SSCALED = 47,
    VK_FORMAT_B8G8R8A8_UINT = 48,
    VK_FORMAT_B8G8R8A8_SINT = 49,
    VK_FORMAT_B8G8R8A8_SRGB = 50,
    VK_FORMAT_A8B8G8R8_UNORM_PACK32 = 51,
    VK_FORMAT_A8B8G8R8_SNORM_PACK32 = 52,
    VK_FORMAT_A8B8G8R8_USCALED_PACK32 = 53,
    VK_FORMAT_A8B8G8R8_SSCALED_PACK32 = 54,
    VK_FORMAT_A8B8G8R8_UINT_PACK32 = 55,
    VK_FORMAT_A8B8G8R8_SINT_PACK32 = 56,
    VK_FORMAT_A8B8G8R8_SRGB_PACK32 = 57,
    VK_FORMAT_A2R10G10B10_UNORM_PACK32 = 58,
    VK_FORMAT_A2R10G10B10_SNORM_PACK32 = 59,
    VK_FORMAT_A2R10G10B10_USCALED_PACK32 = 60,
    VK_FORMAT_A2R10G10B10_SSCALED_PACK32 = 61,
    VK_FORMAT_A2R10G10B10_UINT_PACK32 = 62,
    VK_FORMAT_A2R10G10B10_SINT_PACK32 = 63,
    VK_FORMAT_A2B10G10R10_UNORM_PACK32 = 64,
    VK_FORMAT_A2B10G10R10_SNORM_PACK32 = 65,
    VK_FORMAT_A2B10G10R10_USCALED_PACK32 = 66,
    VK_FORMAT_A2B10G10R10_SSCALED_PACK32 = 67,
    VK_FORMAT_A2B10G10R10_UINT_PACK32 = 68,
    VK_FORMAT_A2B10G10R10_SINT_PACK32 = 69,
    VK_FORMAT_R16_UNORM = 70,
    VK_FORMAT_R16_SNORM = 71,
    VK_FORMAT_R16_USCALED = 72,
    VK_FORMAT_R16_SSCALED = 73,
    VK_FORMAT_R16_UINT = 74,
    VK_FORMAT_R16_SINT = 75,
    VK_FORMAT_R16_SFLOAT = 76,
    VK_FORMAT_R16G16_UNORM = 77,
    VK_FORMAT_R16G16_SNORM = 78,
    VK_FORMAT_R16G16_USCALED = 79,
    VK_FORMAT_R16G16_SSCALED = 80,
    VK_FORMAT_R16G16_UINT = 81,
    VK_FORMAT_R16G16_SINT = 82,
    VK_FORMAT_R16G16_SFLOAT = 83,
    VK_FORMAT_R16G16B16_UNORM = 84,
    VK_FORMAT_R16G16B16_SNORM = 85,
    VK_FORMAT_R16G16B16_USCALED = 86,
    VK_FORMAT_R16G16B16_SSCALED = 87,
    VK_FORMAT_R16G16B16_UINT = 88,
    VK_FORMAT_R16G16B16_SINT = 89,
    VK_FORMAT_R16G16B16_SFLOAT = 90,
    VK_FORMAT_R16G16B16A16_UNORM = 91,
    VK_FORMAT_R16G16B16A16_SNORM = 92,
    VK_FORMAT_R16G16B16A16_USCALED = 93,
    VK_FORMAT_R16G16B16A16_SSCALED = 94,
    VK_FORMAT_R16G16B16A16_UINT = 95,
    VK_FORMAT_R16G16B16A16_SINT = 96,
    VK_FORMAT_R16G16B16A16_SFLOAT = 97,
    VK_FORMAT_R32_UINT = 98,
    VK_FORMAT_R32_SINT = 99,
    VK_FORMAT_R32_SFLOAT = 100,
    VK_FORMAT_R32G32_UINT = 101,
    VK_FORMAT_R32G32_SINT = 102,
    VK_FORMAT_R32G32_SFLOAT = 103,
    VK_FORMAT_R32G32B32_UINT = 104,
    VK_FORMAT_R32G32B32_SINT = 105,
    VK_FORMAT_R32G32B32_SFLOAT = 106,
    VK_FORMAT_R32G32B32A32_UINT = 107,
    VK_FORMAT_R32G32B32A32_SINT = 108,
    VK_FORMAT_R32G32B32A32_SFLOAT = 109,
    VK_FORMAT_R64_UINT = 110,
    VK_FORMAT_R64_SINT = 111,
    VK_FORMAT_R64_SFLOAT = 112,
    VK_FORMAT_R64G64_UINT = 113,
    VK_FORMAT_R64G64_SINT = 114,
    VK_FORMAT_R64G64_SFLOAT = 115,
    VK_FORMAT_R64G64B64_UINT = 116,
    VK_FORMAT_R64G64B64_SINT = 117,
    VK_FORMAT_R64G64B64_SFLOAT = 118,
    VK_FORMAT_R64G64B64A64_UINT = 119,
    VK_FORMAT_R64G64B64A64_SINT = 120,
    VK_FORMAT_R64G64B64A64_SFLOAT = 121,
    VK_FORMAT_B10G11R11_UFLOAT_PACK32 = 122,
    VK_FORMAT_E5B9G9R9_UFLOAT_PACK32 = 123,
    VK_FORMAT_D16_UNORM = 124,
    VK_FORMAT_X8_D24_UNORM_PACK32 = 125,
    VK_FORMAT_D32_SFLOAT = 126,
    VK_FORMAT_S8_UINT = 127,
    VK_FORMAT_D16_UNORM_S8_UINT = 128,
    VK_FORMAT_D24_UNORM_S8_UINT = 129,
    VK_FORMAT_D32_SFLOAT_S8_UINT = 130,
    VK_FORMAT_BC1_RGB_UNORM_BLOCK = 131,
    VK_FORMAT_BC1_RGB_SRGB_BLOCK = 132,
    VK_FORMAT_BC1_RGBA_UNORM_BLOCK = 133,
    VK_FORMAT_BC1_RGBA_SRGB_BLOCK = 134,
    VK_FORMAT_BC2_UNORM_BLOCK = 135,
    VK_FORMAT_BC2_SRGB_BLOCK = 136,
    VK_FORMAT_BC3_UNORM_BLOCK = 137,
    VK_FORMAT_BC3_SRGB_BLOCK = 138,
    VK_FORMAT_BC4_UNORM_BLOCK = 139,
    VK_FORMAT_BC4_SNORM_BLOCK = 140,
    VK_FORMAT_BC5_UNORM_BLOCK = 141,
    VK_FORMAT_BC5_SNORM_BLOCK = 142,
    VK_FORMAT_BC6H_UFLOAT_BLOCK = 143,
    VK_FORMAT_BC6H_SFLOAT_BLOCK = 144,
    VK_FORMAT_BC7_UNORM_BLOCK = 145,
    VK_FORMAT_BC7_SRGB_BLOCK = 146,
    VK_FORMAT_ETC2_R8G8B8_UNORM_BLOCK = 147,
    VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK = 148,
    VK_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK = 149,
    VK_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK = 150,
    VK_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK = 151,
    VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK = 152,
    VK_FORMAT_EAC_R11_UNORM_BLOCK = 153,
    VK_FORMAT_EAC_R11_SNORM_BLOCK = 154,
    VK_FORMAT_EAC_R11G11_UNORM_BLOCK = 155,
    VK_FORMAT_EAC_R11G11_SNORM_BLOCK = 156,
    VK_FORMAT_ASTC_4x4_UNORM_BLOCK = 157,
    VK_FORMAT_ASTC_4x4_SRGB_BLOCK = 158,
    VK_FORMAT_ASTC_5x4_UNORM_BLOCK = 159,
    VK_FORMAT_ASTC_5x4_SRGB_BLOCK = 160,
    VK_FORMAT_ASTC_5x5_UNORM_BLOCK = 161,
    VK_FORMAT_ASTC_5x5_SRGB_BLOCK = 162,
    VK_FORMAT_ASTC_6x5_UNORM_BLOCK = 163,
    VK_FORMAT_ASTC_6x5_SRGB_BLOCK = 164,
    VK_FORMAT_ASTC_6x6_UNORM_BLOCK = 165,
    VK_FORMAT_ASTC_6x6_SRGB_BLOCK = 166,
    VK_FORMAT_ASTC_8x5_UNORM_BLOCK = 167,
    VK_FORMAT_ASTC_8x5_SRGB_BLOCK = 168,
    VK_FORMAT_ASTC_8x6_UNORM_BLOCK = 169,
    VK_FORMAT_ASTC_8x6_SRGB_BLOCK = 170,
    VK_FORMAT_ASTC_8x8_UNORM_BLOCK = 171,
    VK_FORMAT_ASTC_8x8_SRGB_BLOCK = 172,
    VK_FORMAT_ASTC_10x5_UNORM_BLOCK = 173,
    VK_FORMAT_ASTC_10x5_SRGB_BLOCK = 174,
    VK_FORMAT_ASTC_10x6_UNORM_BLOCK = 175,
    VK_FORMAT_ASTC_10x6_SRGB_BLOCK = 176,
    VK_FORMAT_ASTC_10x8_UNORM_BLOCK = 177,
    VK_FORMAT_ASTC_10x8_SRGB_BLOCK = 178,
    VK_FORMAT_ASTC_10x10_UNORM_BLOCK = 179,
    VK_FORMAT_ASTC_10x10_SRGB_BLOCK = 180,
    VK_FORMAT_ASTC_12x10_UNORM_BLOCK = 181,
    VK_FORMAT_ASTC_12x10_SRGB_BLOCK = 182,
    VK_FORMAT_ASTC_12x12_UNORM_BLOCK = 183,
    VK_FORMAT_ASTC_12x12_SRGB_BLOCK = 184,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G8B8G8R8_422_UNORM = 1000156000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_B8G8R8G8_422_UNORM = 1000156001,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM = 1000156002,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G8_B8R8_2PLANE_420_UNORM = 1000156003,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G8_B8_R8_3PLANE_422_UNORM = 1000156004,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G8_B8R8_2PLANE_422_UNORM = 1000156005,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G8_B8_R8_3PLANE_444_UNORM = 1000156006,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_R10X6_UNORM_PACK16 = 1000156007,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_R10X6G10X6_UNORM_2PACK16 = 1000156008,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16 = 1000156009,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16 = 1000156010,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16 = 1000156011,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16 = 1000156012,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16 = 1000156013,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16 = 1000156014,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16 = 1000156015,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16 = 1000156016,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_R12X4_UNORM_PACK16 = 1000156017,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_R12X4G12X4_UNORM_2PACK16 = 1000156018,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16 = 1000156019,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16 = 1000156020,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16 = 1000156021,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16 = 1000156022,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16 = 1000156023,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16 = 1000156024,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16 = 1000156025,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16 = 1000156026,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G16B16G16R16_422_UNORM = 1000156027,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_B16G16R16G16_422_UNORM = 1000156028,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G16_B16_R16_3PLANE_420_UNORM = 1000156029,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G16_B16R16_2PLANE_420_UNORM = 1000156030,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G16_B16_R16_3PLANE_422_UNORM = 1000156031,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G16_B16R16_2PLANE_422_UNORM = 1000156032,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_G16_B16_R16_3PLANE_444_UNORM = 1000156033,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_G8_B8R8_2PLANE_444_UNORM = 1000330000,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16 = 1000330001,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16 = 1000330002,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_G16_B16R16_2PLANE_444_UNORM = 1000330003,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_A4R4G4B4_UNORM_PACK16 = 1000340000,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_A4B4G4R4_UNORM_PACK16 = 1000340001,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK = 1000066000,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK = 1000066001,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK = 1000066002,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK = 1000066003,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK = 1000066004,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK = 1000066005,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK = 1000066006,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK = 1000066007,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK = 1000066008,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK = 1000066009,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK = 1000066010,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK = 1000066011,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK = 1000066012,
  // Provided by VK_VERSION_1_3
    VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK = 1000066013,
  // Provided by VK_VERSION_1_4
    VK_FORMAT_A1B5G5R5_UNORM_PACK16 = 1000470000,
  // Provided by VK_VERSION_1_4
    VK_FORMAT_A8_UNORM = 1000470001,
  // Provided by VK_IMG_format_pvrtc
    VK_FORMAT_PVRTC1_2BPP_UNORM_BLOCK_IMG = 1000054000,
  // Provided by VK_IMG_format_pvrtc
    VK_FORMAT_PVRTC1_4BPP_UNORM_BLOCK_IMG = 1000054001,
  // Provided by VK_IMG_format_pvrtc
    VK_FORMAT_PVRTC2_2BPP_UNORM_BLOCK_IMG = 1000054002,
  // Provided by VK_IMG_format_pvrtc
    VK_FORMAT_PVRTC2_4BPP_UNORM_BLOCK_IMG = 1000054003,
  // Provided by VK_IMG_format_pvrtc
    VK_FORMAT_PVRTC1_2BPP_SRGB_BLOCK_IMG = 1000054004,
  // Provided by VK_IMG_format_pvrtc
    VK_FORMAT_PVRTC1_4BPP_SRGB_BLOCK_IMG = 1000054005,
  // Provided by VK_IMG_format_pvrtc
    VK_FORMAT_PVRTC2_2BPP_SRGB_BLOCK_IMG = 1000054006,
  // Provided by VK_IMG_format_pvrtc
    VK_FORMAT_PVRTC2_4BPP_SRGB_BLOCK_IMG = 1000054007,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_3x3x3_UNORM_BLOCK_EXT = 1000288000,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_3x3x3_SRGB_BLOCK_EXT = 1000288001,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_3x3x3_SFLOAT_BLOCK_EXT = 1000288002,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_4x3x3_UNORM_BLOCK_EXT = 1000288003,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_4x3x3_SRGB_BLOCK_EXT = 1000288004,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_4x3x3_SFLOAT_BLOCK_EXT = 1000288005,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_4x4x3_UNORM_BLOCK_EXT = 1000288006,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_4x4x3_SRGB_BLOCK_EXT = 1000288007,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_4x4x3_SFLOAT_BLOCK_EXT = 1000288008,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_4x4x4_UNORM_BLOCK_EXT = 1000288009,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_4x4x4_SRGB_BLOCK_EXT = 1000288010,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_4x4x4_SFLOAT_BLOCK_EXT = 1000288011,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_5x4x4_UNORM_BLOCK_EXT = 1000288012,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_5x4x4_SRGB_BLOCK_EXT = 1000288013,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_5x4x4_SFLOAT_BLOCK_EXT = 1000288014,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_5x5x4_UNORM_BLOCK_EXT = 1000288015,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_5x5x4_SRGB_BLOCK_EXT = 1000288016,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_5x5x4_SFLOAT_BLOCK_EXT = 1000288017,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_5x5x5_UNORM_BLOCK_EXT = 1000288018,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_5x5x5_SRGB_BLOCK_EXT = 1000288019,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_5x5x5_SFLOAT_BLOCK_EXT = 1000288020,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_6x5x5_UNORM_BLOCK_EXT = 1000288021,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_6x5x5_SRGB_BLOCK_EXT = 1000288022,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_6x5x5_SFLOAT_BLOCK_EXT = 1000288023,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_6x6x5_UNORM_BLOCK_EXT = 1000288024,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_6x6x5_SRGB_BLOCK_EXT = 1000288025,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_6x6x5_SFLOAT_BLOCK_EXT = 1000288026,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_6x6x6_UNORM_BLOCK_EXT = 1000288027,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_6x6x6_SRGB_BLOCK_EXT = 1000288028,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_FORMAT_ASTC_6x6x6_SFLOAT_BLOCK_EXT = 1000288029,
  // Provided by VK_ARM_tensors
    VK_FORMAT_R8_BOOL_ARM = 1000460000,
  // Provided by VK_KHR_shader_bfloat16 with VK_ARM_tensors
    VK_FORMAT_R16_SFLOAT_FPENCODING_BFLOAT16_ARM = 1000460001,
  // Provided by VK_EXT_shader_float8 with VK_ARM_tensors
    VK_FORMAT_R8_SFLOAT_FPENCODING_FLOAT8E4M3_ARM = 1000460002,
  // Provided by VK_EXT_shader_float8 with VK_ARM_tensors
    VK_FORMAT_R8_SFLOAT_FPENCODING_FLOAT8E5M2_ARM = 1000460003,
  // Provided by VK_NV_optical_flow
    VK_FORMAT_R16G16_SFIXED5_NV = 1000464000,
  // Provided by VK_ARM_format_pack
    VK_FORMAT_R10X6_UINT_PACK16_ARM = 1000609000,
  // Provided by VK_ARM_format_pack
    VK_FORMAT_R10X6G10X6_UINT_2PACK16_ARM = 1000609001,
  // Provided by VK_ARM_format_pack
    VK_FORMAT_R10X6G10X6B10X6A10X6_UINT_4PACK16_ARM = 1000609002,
  // Provided by VK_ARM_format_pack
    VK_FORMAT_R12X4_UINT_PACK16_ARM = 1000609003,
  // Provided by VK_ARM_format_pack
    VK_FORMAT_R12X4G12X4_UINT_2PACK16_ARM = 1000609004,
  // Provided by VK_ARM_format_pack
    VK_FORMAT_R12X4G12X4B12X4A12X4_UINT_4PACK16_ARM = 1000609005,
  // Provided by VK_ARM_format_pack
    VK_FORMAT_R14X2_UINT_PACK16_ARM = 1000609006,
  // Provided by VK_ARM_format_pack
    VK_FORMAT_R14X2G14X2_UINT_2PACK16_ARM = 1000609007,
  // Provided by VK_ARM_format_pack
    VK_FORMAT_R14X2G14X2B14X2A14X2_UINT_4PACK16_ARM = 1000609008,
  // Provided by VK_ARM_format_pack
    VK_FORMAT_R14X2_UNORM_PACK16_ARM = 1000609009,
  // Provided by VK_ARM_format_pack
    VK_FORMAT_R14X2G14X2_UNORM_2PACK16_ARM = 1000609010,
  // Provided by VK_ARM_format_pack
    VK_FORMAT_R14X2G14X2B14X2A14X2_UNORM_4PACK16_ARM = 1000609011,
  // Provided by VK_ARM_format_pack
    VK_FORMAT_G14X2_B14X2R14X2_2PLANE_420_UNORM_3PACK16_ARM = 1000609012,
  // Provided by VK_ARM_format_pack
    VK_FORMAT_G14X2_B14X2R14X2_2PLANE_422_UNORM_3PACK16_ARM = 1000609013,
  // Provided by VK_EXT_texture_compression_astc_hdr
    VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK_EXT = VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK,
  // Provided by VK_EXT_texture_compression_astc_hdr
    VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK_EXT = VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK,
  // Provided by VK_EXT_texture_compression_astc_hdr
    VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK_EXT = VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK,
  // Provided by VK_EXT_texture_compression_astc_hdr
    VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK_EXT = VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK,
  // Provided by VK_EXT_texture_compression_astc_hdr
    VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK_EXT = VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK,
  // Provided by VK_EXT_texture_compression_astc_hdr
    VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK_EXT = VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK,
  // Provided by VK_EXT_texture_compression_astc_hdr
    VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK_EXT = VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK,
  // Provided by VK_EXT_texture_compression_astc_hdr
    VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK_EXT = VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK,
  // Provided by VK_EXT_texture_compression_astc_hdr
    VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK_EXT = VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK,
  // Provided by VK_EXT_texture_compression_astc_hdr
    VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK_EXT = VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK,
  // Provided by VK_EXT_texture_compression_astc_hdr
    VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK_EXT = VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK,
  // Provided by VK_EXT_texture_compression_astc_hdr
    VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK_EXT = VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK,
  // Provided by VK_EXT_texture_compression_astc_hdr
    VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK_EXT = VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK,
  // Provided by VK_EXT_texture_compression_astc_hdr
    VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK_EXT = VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G8B8G8R8_422_UNORM_KHR = VK_FORMAT_G8B8G8R8_422_UNORM,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_B8G8R8G8_422_UNORM_KHR = VK_FORMAT_B8G8R8G8_422_UNORM,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM_KHR = VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G8_B8R8_2PLANE_420_UNORM_KHR = VK_FORMAT_G8_B8R8_2PLANE_420_UNORM,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G8_B8_R8_3PLANE_422_UNORM_KHR = VK_FORMAT_G8_B8_R8_3PLANE_422_UNORM,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G8_B8R8_2PLANE_422_UNORM_KHR = VK_FORMAT_G8_B8R8_2PLANE_422_UNORM,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G8_B8_R8_3PLANE_444_UNORM_KHR = VK_FORMAT_G8_B8_R8_3PLANE_444_UNORM,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_R10X6_UNORM_PACK16_KHR = VK_FORMAT_R10X6_UNORM_PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_R10X6G10X6_UNORM_2PACK16_KHR = VK_FORMAT_R10X6G10X6_UNORM_2PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16_KHR = VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16_KHR = VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16_KHR = VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16_KHR = VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16_KHR = VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16_KHR = VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16_KHR = VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16_KHR = VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_R12X4_UNORM_PACK16_KHR = VK_FORMAT_R12X4_UNORM_PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_R12X4G12X4_UNORM_2PACK16_KHR = VK_FORMAT_R12X4G12X4_UNORM_2PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16_KHR = VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16_KHR = VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16_KHR = VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16_KHR = VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16_KHR = VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16_KHR = VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16_KHR = VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16_KHR = VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G16B16G16R16_422_UNORM_KHR = VK_FORMAT_G16B16G16R16_422_UNORM,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_B16G16R16G16_422_UNORM_KHR = VK_FORMAT_B16G16R16G16_422_UNORM,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G16_B16_R16_3PLANE_420_UNORM_KHR = VK_FORMAT_G16_B16_R16_3PLANE_420_UNORM,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G16_B16R16_2PLANE_420_UNORM_KHR = VK_FORMAT_G16_B16R16_2PLANE_420_UNORM,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G16_B16_R16_3PLANE_422_UNORM_KHR = VK_FORMAT_G16_B16_R16_3PLANE_422_UNORM,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G16_B16R16_2PLANE_422_UNORM_KHR = VK_FORMAT_G16_B16R16_2PLANE_422_UNORM,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_G16_B16_R16_3PLANE_444_UNORM_KHR = VK_FORMAT_G16_B16_R16_3PLANE_444_UNORM,
  // Provided by VK_EXT_ycbcr_2plane_444_formats
    VK_FORMAT_G8_B8R8_2PLANE_444_UNORM_EXT = VK_FORMAT_G8_B8R8_2PLANE_444_UNORM,
  // Provided by VK_EXT_ycbcr_2plane_444_formats
    VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16_EXT = VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16,
  // Provided by VK_EXT_ycbcr_2plane_444_formats
    VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16_EXT = VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16,
  // Provided by VK_EXT_ycbcr_2plane_444_formats
    VK_FORMAT_G16_B16R16_2PLANE_444_UNORM_EXT = VK_FORMAT_G16_B16R16_2PLANE_444_UNORM,
  // Provided by VK_EXT_4444_formats
    VK_FORMAT_A4R4G4B4_UNORM_PACK16_EXT = VK_FORMAT_A4R4G4B4_UNORM_PACK16,
  // Provided by VK_EXT_4444_formats
    VK_FORMAT_A4B4G4R4_UNORM_PACK16_EXT = VK_FORMAT_A4B4G4R4_UNORM_PACK16,
  // Provided by VK_NV_optical_flow
  // VK_FORMAT_R16G16_S10_5_NV is a legacy alias
    VK_FORMAT_R16G16_S10_5_NV = VK_FORMAT_R16G16_SFIXED5_NV,
  // Provided by VK_KHR_maintenance5
    VK_FORMAT_A1B5G5R5_UNORM_PACK16_KHR = VK_FORMAT_A1B5G5R5_UNORM_PACK16,
  // Provided by VK_KHR_maintenance5
    VK_FORMAT_A8_UNORM_KHR = VK_FORMAT_A8_UNORM,
} VkFormat;

* 
[VK_FORMAT_UNDEFINED](#VkFormat) specifies that the format is not specified.

* 
[VK_FORMAT_R4G4_UNORM_PACK8](#VkFormat) specifies a two-component, 8-bit packed
unsigned normalized format that has a 4-bit R component in bits 4..7,
and a 4-bit G component in bits 0..3.

* 
[VK_FORMAT_R4G4B4A4_UNORM_PACK16](#VkFormat) specifies a four-component, 16-bit
packed unsigned normalized format that has a 4-bit R component in bits
12..15, a 4-bit G component in bits 8..11, a 4-bit B component in bits
4..7, and a 4-bit A component in bits 0..3.

* 
[VK_FORMAT_B4G4R4A4_UNORM_PACK16](#VkFormat) specifies a four-component, 16-bit
packed unsigned normalized format that has a 4-bit B component in bits
12..15, a 4-bit G component in bits 8..11, a 4-bit R component in bits
4..7, and a 4-bit A component in bits 0..3.

* 
[VK_FORMAT_A4R4G4B4_UNORM_PACK16](#VkFormat) specifies a four-component, 16-bit
packed unsigned normalized format that has a 4-bit A component in bits
12..15, a 4-bit R component in bits 8..11, a 4-bit G component in bits
4..7, and a 4-bit B component in bits 0..3.

* 
[VK_FORMAT_A4B4G4R4_UNORM_PACK16](#VkFormat) specifies a four-component, 16-bit
packed unsigned normalized format that has a 4-bit A component in bits
12..15, a 4-bit B component in bits 8..11, a 4-bit G component in bits
4..7, and a 4-bit R component in bits 0..3.

* 
[VK_FORMAT_R5G6B5_UNORM_PACK16](#VkFormat) specifies a three-component, 16-bit
packed unsigned normalized format that has a 5-bit R component in bits
11..15, a 6-bit G component in bits 5..10, and a 5-bit B component in
bits 0..4.

* 
[VK_FORMAT_B5G6R5_UNORM_PACK16](#VkFormat) specifies a three-component, 16-bit
packed unsigned normalized format that has a 5-bit B component in bits
11..15, a 6-bit G component in bits 5..10, and a 5-bit R component in
bits 0..4.

* 
[VK_FORMAT_R5G5B5A1_UNORM_PACK16](#VkFormat) specifies a four-component, 16-bit
packed unsigned normalized format that has a 5-bit R component in bits
11..15, a 5-bit G component in bits 6..10, a 5-bit B component in bits
1..5, and a 1-bit A component in bit 0.

* 
[VK_FORMAT_B5G5R5A1_UNORM_PACK16](#VkFormat) specifies a four-component, 16-bit
packed unsigned normalized format that has a 5-bit B component in bits
11..15, a 5-bit G component in bits 6..10, a 5-bit R component in bits
1..5, and a 1-bit A component in bit 0.

* 
[VK_FORMAT_A1R5G5B5_UNORM_PACK16](#VkFormat) specifies a four-component, 16-bit
packed unsigned normalized format that has a 1-bit A component in bit
15, a 5-bit R component in bits 10..14, a 5-bit G component in bits
5..9, and a 5-bit B component in bits 0..4.

* 
[VK_FORMAT_A1B5G5R5_UNORM_PACK16](#VkFormat) specifies a four-component, 16-bit
packed unsigned normalized format that has a 1-bit A component in bit
15, a 5-bit B component in bits 10..14, a 5-bit G component in bits
5..9, and a 5-bit R component in bits 0..4.

* 
[VK_FORMAT_A8_UNORM](#VkFormat) specifies a one-component, 8-bit unsigned
normalized format that has a single 8-bit A component.

* 
[VK_FORMAT_R8_UNORM](#VkFormat) specifies a one-component, 8-bit unsigned
normalized format that has a single 8-bit R component.

* 
[VK_FORMAT_R8_SNORM](#VkFormat) specifies a one-component, 8-bit signed
normalized format that has a single 8-bit R component.

* 
[VK_FORMAT_R8_USCALED](#VkFormat) specifies a one-component, 8-bit unsigned
scaled integer format that has a single 8-bit R component.

* 
[VK_FORMAT_R8_SSCALED](#VkFormat) specifies a one-component, 8-bit signed
scaled integer format that has a single 8-bit R component.

* 
[VK_FORMAT_R8_UINT](#VkFormat) specifies a one-component, 8-bit unsigned
integer format that has a single 8-bit R component.

* 
[VK_FORMAT_R8_SINT](#VkFormat) specifies a one-component, 8-bit signed integer
format that has a single 8-bit R component.

* 
[VK_FORMAT_R8_SRGB](#VkFormat) specifies a one-component, 8-bit unsigned
normalized format that has a single 8-bit R component stored with sRGB
nonlinear encoding.

* 
[VK_FORMAT_R8G8_UNORM](#VkFormat) specifies a two-component, 16-bit unsigned
normalized format that has an 8-bit R component in byte 0, and an 8-bit
G component in byte 1.

* 
[VK_FORMAT_R8G8_SNORM](#VkFormat) specifies a two-component, 16-bit signed
normalized format that has an 8-bit R component in byte 0, and an 8-bit
G component in byte 1.

* 
[VK_FORMAT_R8G8_USCALED](#VkFormat) specifies a two-component, 16-bit unsigned
scaled integer format that has an 8-bit R component in byte 0, and an
8-bit G component in byte 1.

* 
[VK_FORMAT_R8G8_SSCALED](#VkFormat) specifies a two-component, 16-bit signed
scaled integer format that has an 8-bit R component in byte 0, and an
8-bit G component in byte 1.

* 
[VK_FORMAT_R8G8_UINT](#VkFormat) specifies a two-component, 16-bit unsigned
integer format that has an 8-bit R component in byte 0, and an 8-bit G
component in byte 1.

* 
[VK_FORMAT_R8G8_SINT](#VkFormat) specifies a two-component, 16-bit signed
integer format that has an 8-bit R component in byte 0, and an 8-bit G
component in byte 1.

* 
[VK_FORMAT_R8G8_SRGB](#VkFormat) specifies a two-component, 16-bit unsigned
normalized format that has an 8-bit R component stored with sRGB
nonlinear encoding in byte 0, and an 8-bit G component stored with sRGB
nonlinear encoding in byte 1.

* 
[VK_FORMAT_R8G8B8_UNORM](#VkFormat) specifies a three-component, 24-bit
unsigned normalized format that has an 8-bit R component in byte 0, an
8-bit G component in byte 1, and an 8-bit B component in byte 2.

* 
[VK_FORMAT_R8G8B8_SNORM](#VkFormat) specifies a three-component, 24-bit signed
normalized format that has an 8-bit R component in byte 0, an 8-bit G
component in byte 1, and an 8-bit B component in byte 2.

* 
[VK_FORMAT_R8G8B8_USCALED](#VkFormat) specifies a three-component, 24-bit
unsigned scaled format that has an 8-bit R component in byte 0, an 8-bit
G component in byte 1, and an 8-bit B component in byte 2.

* 
[VK_FORMAT_R8G8B8_SSCALED](#VkFormat) specifies a three-component, 24-bit
signed scaled format that has an 8-bit R component in byte 0, an 8-bit G
component in byte 1, and an 8-bit B component in byte 2.

* 
[VK_FORMAT_R8G8B8_UINT](#VkFormat) specifies a three-component, 24-bit unsigned
integer format that has an 8-bit R component in byte 0, an 8-bit G
component in byte 1, and an 8-bit B component in byte 2.

* 
[VK_FORMAT_R8G8B8_SINT](#VkFormat) specifies a three-component, 24-bit signed
integer format that has an 8-bit R component in byte 0, an 8-bit G
component in byte 1, and an 8-bit B component in byte 2.

* 
[VK_FORMAT_R8G8B8_SRGB](#VkFormat) specifies a three-component, 24-bit unsigned
normalized format that has an 8-bit R component stored with sRGB
nonlinear encoding in byte 0, an 8-bit G component stored with sRGB
nonlinear encoding in byte 1, and an 8-bit B component stored with sRGB
nonlinear encoding in byte 2.

* 
[VK_FORMAT_B8G8R8_UNORM](#VkFormat) specifies a three-component, 24-bit
unsigned normalized format that has an 8-bit B component in byte 0, an
8-bit G component in byte 1, and an 8-bit R component in byte 2.

* 
[VK_FORMAT_B8G8R8_SNORM](#VkFormat) specifies a three-component, 24-bit signed
normalized format that has an 8-bit B component in byte 0, an 8-bit G
component in byte 1, and an 8-bit R component in byte 2.

* 
[VK_FORMAT_B8G8R8_USCALED](#VkFormat) specifies a three-component, 24-bit
unsigned scaled format that has an 8-bit B component in byte 0, an 8-bit
G component in byte 1, and an 8-bit R component in byte 2.

* 
[VK_FORMAT_B8G8R8_SSCALED](#VkFormat) specifies a three-component, 24-bit
signed scaled format that has an 8-bit B component in byte 0, an 8-bit G
component in byte 1, and an 8-bit R component in byte 2.

* 
[VK_FORMAT_B8G8R8_UINT](#VkFormat) specifies a three-component, 24-bit unsigned
integer format that has an 8-bit B component in byte 0, an 8-bit G
component in byte 1, and an 8-bit R component in byte 2.

* 
[VK_FORMAT_B8G8R8_SINT](#VkFormat) specifies a three-component, 24-bit signed
integer format that has an 8-bit B component in byte 0, an 8-bit G
component in byte 1, and an 8-bit R component in byte 2.

* 
[VK_FORMAT_B8G8R8_SRGB](#VkFormat) specifies a three-component, 24-bit unsigned
normalized format that has an 8-bit B component stored with sRGB
nonlinear encoding in byte 0, an 8-bit G component stored with sRGB
nonlinear encoding in byte 1, and an 8-bit R component stored with sRGB
nonlinear encoding in byte 2.

* 
[VK_FORMAT_R8G8B8A8_UNORM](#VkFormat) specifies a four-component, 32-bit
unsigned normalized format that has an 8-bit R component in byte 0, an
8-bit G component in byte 1, an 8-bit B component in byte 2, and an
8-bit A component in byte 3.

* 
[VK_FORMAT_R8G8B8A8_SNORM](#VkFormat) specifies a four-component, 32-bit signed
normalized format that has an 8-bit R component in byte 0, an 8-bit G
component in byte 1, an 8-bit B component in byte 2, and an 8-bit A
component in byte 3.

* 
[VK_FORMAT_R8G8B8A8_USCALED](#VkFormat) specifies a four-component, 32-bit
unsigned scaled format that has an 8-bit R component in byte 0, an 8-bit
G component in byte 1, an 8-bit B component in byte 2, and an 8-bit A
component in byte 3.

* 
[VK_FORMAT_R8G8B8A8_SSCALED](#VkFormat) specifies a four-component, 32-bit
signed scaled format that has an 8-bit R component in byte 0, an 8-bit G
component in byte 1, an 8-bit B component in byte 2, and an 8-bit A
component in byte 3.

* 
[VK_FORMAT_R8G8B8A8_UINT](#VkFormat) specifies a four-component, 32-bit
unsigned integer format that has an 8-bit R component in byte 0, an
8-bit G component in byte 1, an 8-bit B component in byte 2, and an
8-bit A component in byte 3.

* 
[VK_FORMAT_R8G8B8A8_SINT](#VkFormat) specifies a four-component, 32-bit signed
integer format that has an 8-bit R component in byte 0, an 8-bit G
component in byte 1, an 8-bit B component in byte 2, and an 8-bit A
component in byte 3.

* 
[VK_FORMAT_R8G8B8A8_SRGB](#VkFormat) specifies a four-component, 32-bit
unsigned normalized format that has an 8-bit R component stored with
sRGB nonlinear encoding in byte 0, an 8-bit G component stored with sRGB
nonlinear encoding in byte 1, an 8-bit B component stored with sRGB
nonlinear encoding in byte 2, and an 8-bit A component in byte 3.

* 
[VK_FORMAT_B8G8R8A8_UNORM](#VkFormat) specifies a four-component, 32-bit
unsigned normalized format that has an 8-bit B component in byte 0, an
8-bit G component in byte 1, an 8-bit R component in byte 2, and an
8-bit A component in byte 3.

* 
[VK_FORMAT_B8G8R8A8_SNORM](#VkFormat) specifies a four-component, 32-bit signed
normalized format that has an 8-bit B component in byte 0, an 8-bit G
component in byte 1, an 8-bit R component in byte 2, and an 8-bit A
component in byte 3.

* 
[VK_FORMAT_B8G8R8A8_USCALED](#VkFormat) specifies a four-component, 32-bit
unsigned scaled format that has an 8-bit B component in byte 0, an 8-bit
G component in byte 1, an 8-bit R component in byte 2, and an 8-bit A
component in byte 3.

* 
[VK_FORMAT_B8G8R8A8_SSCALED](#VkFormat) specifies a four-component, 32-bit
signed scaled format that has an 8-bit B component in byte 0, an 8-bit G
component in byte 1, an 8-bit R component in byte 2, and an 8-bit A
component in byte 3.

* 
[VK_FORMAT_B8G8R8A8_UINT](#VkFormat) specifies a four-component, 32-bit
unsigned integer format that has an 8-bit B component in byte 0, an
8-bit G component in byte 1, an 8-bit R component in byte 2, and an
8-bit A component in byte 3.

* 
[VK_FORMAT_B8G8R8A8_SINT](#VkFormat) specifies a four-component, 32-bit signed
integer format that has an 8-bit B component in byte 0, an 8-bit G
component in byte 1, an 8-bit R component in byte 2, and an 8-bit A
component in byte 3.

* 
[VK_FORMAT_B8G8R8A8_SRGB](#VkFormat) specifies a four-component, 32-bit
unsigned normalized format that has an 8-bit B component stored with
sRGB nonlinear encoding in byte 0, an 8-bit G component stored with sRGB
nonlinear encoding in byte 1, an 8-bit R component stored with sRGB
nonlinear encoding in byte 2, and an 8-bit A component in byte 3.

* 
[VK_FORMAT_A8B8G8R8_UNORM_PACK32](#VkFormat) specifies a four-component, 32-bit
packed unsigned normalized format that has an 8-bit A component in bits
24..31, an 8-bit B component in bits 16..23, an 8-bit G component in
bits 8..15, and an 8-bit R component in bits 0..7.

* 
[VK_FORMAT_A8B8G8R8_SNORM_PACK32](#VkFormat) specifies a four-component, 32-bit
packed signed normalized format that has an 8-bit A component in bits
24..31, an 8-bit B component in bits 16..23, an 8-bit G component in
bits 8..15, and an 8-bit R component in bits 0..7.

* 
[VK_FORMAT_A8B8G8R8_USCALED_PACK32](#VkFormat) specifies a four-component,
32-bit packed unsigned scaled integer format that has an 8-bit A
component in bits 24..31, an 8-bit B component in bits 16..23, an 8-bit
G component in bits 8..15, and an 8-bit R component in bits 0..7.

* 
[VK_FORMAT_A8B8G8R8_SSCALED_PACK32](#VkFormat) specifies a four-component,
32-bit packed signed scaled integer format that has an 8-bit A component
in bits 24..31, an 8-bit B component in bits 16..23, an 8-bit G
component in bits 8..15, and an 8-bit R component in bits 0..7.

* 
[VK_FORMAT_A8B8G8R8_UINT_PACK32](#VkFormat) specifies a four-component, 32-bit
packed unsigned integer format that has an 8-bit A component in bits
24..31, an 8-bit B component in bits 16..23, an 8-bit G component in
bits 8..15, and an 8-bit R component in bits 0..7.

* 
[VK_FORMAT_A8B8G8R8_SINT_PACK32](#VkFormat) specifies a four-component, 32-bit
packed signed integer format that has an 8-bit A component in bits
24..31, an 8-bit B component in bits 16..23, an 8-bit G component in
bits 8..15, and an 8-bit R component in bits 0..7.

* 
[VK_FORMAT_A8B8G8R8_SRGB_PACK32](#VkFormat) specifies a four-component, 32-bit
packed unsigned normalized format that has an 8-bit A component in bits
24..31, an 8-bit B component stored with sRGB nonlinear encoding in bits
16..23, an 8-bit G component stored with sRGB nonlinear encoding in bits
8..15, and an 8-bit R component stored with sRGB nonlinear encoding in
bits 0..7.

* 
[VK_FORMAT_A2R10G10B10_UNORM_PACK32](#VkFormat) specifies a four-component,
32-bit packed unsigned normalized format that has a 2-bit A component in
bits 30..31, a 10-bit R component in bits 20..29, a 10-bit G component
in bits 10..19, and a 10-bit B component in bits 0..9.

* 
[VK_FORMAT_A2R10G10B10_SNORM_PACK32](#VkFormat) specifies a four-component,
32-bit packed signed normalized format that has a 2-bit A component in
bits 30..31, a 10-bit R component in bits 20..29, a 10-bit G component
in bits 10..19, and a 10-bit B component in bits 0..9.

* 
[VK_FORMAT_A2R10G10B10_USCALED_PACK32](#VkFormat) specifies a four-component,
32-bit packed unsigned scaled integer format that has a 2-bit A
component in bits 30..31, a 10-bit R component in bits 20..29, a 10-bit
G component in bits 10..19, and a 10-bit B component in bits 0..9.

* 
[VK_FORMAT_A2R10G10B10_SSCALED_PACK32](#VkFormat) specifies a four-component,
32-bit packed signed scaled integer format that has a 2-bit A component
in bits 30..31, a 10-bit R component in bits 20..29, a 10-bit G
component in bits 10..19, and a 10-bit B component in bits 0..9.

* 
[VK_FORMAT_A2R10G10B10_UINT_PACK32](#VkFormat) specifies a four-component,
32-bit packed unsigned integer format that has a 2-bit A component in
bits 30..31, a 10-bit R component in bits 20..29, a 10-bit G component
in bits 10..19, and a 10-bit B component in bits 0..9.

* 
[VK_FORMAT_A2R10G10B10_SINT_PACK32](#VkFormat) specifies a four-component,
32-bit packed signed integer format that has a 2-bit A component in bits
30..31, a 10-bit R component in bits 20..29, a 10-bit G component in
bits 10..19, and a 10-bit B component in bits 0..9.

* 
[VK_FORMAT_A2B10G10R10_UNORM_PACK32](#VkFormat) specifies a four-component,
32-bit packed unsigned normalized format that has a 2-bit A component in
bits 30..31, a 10-bit B component in bits 20..29, a 10-bit G component
in bits 10..19, and a 10-bit R component in bits 0..9.

* 
[VK_FORMAT_A2B10G10R10_SNORM_PACK32](#VkFormat) specifies a four-component,
32-bit packed signed normalized format that has a 2-bit A component in
bits 30..31, a 10-bit B component in bits 20..29, a 10-bit G component
in bits 10..19, and a 10-bit R component in bits 0..9.

* 
[VK_FORMAT_A2B10G10R10_USCALED_PACK32](#VkFormat) specifies a four-component,
32-bit packed unsigned scaled integer format that has a 2-bit A
component in bits 30..31, a 10-bit B component in bits 20..29, a 10-bit
G component in bits 10..19, and a 10-bit R component in bits 0..9.

* 
[VK_FORMAT_A2B10G10R10_SSCALED_PACK32](#VkFormat) specifies a four-component,
32-bit packed signed scaled integer format that has a 2-bit A component
in bits 30..31, a 10-bit B component in bits 20..29, a 10-bit G
component in bits 10..19, and a 10-bit R component in bits 0..9.

* 
[VK_FORMAT_A2B10G10R10_UINT_PACK32](#VkFormat) specifies a four-component,
32-bit packed unsigned integer format that has a 2-bit A component in
bits 30..31, a 10-bit B component in bits 20..29, a 10-bit G component
in bits 10..19, and a 10-bit R component in bits 0..9.

* 
[VK_FORMAT_A2B10G10R10_SINT_PACK32](#VkFormat) specifies a four-component,
32-bit packed signed integer format that has a 2-bit A component in bits
30..31, a 10-bit B component in bits 20..29, a 10-bit G component in
bits 10..19, and a 10-bit R component in bits 0..9.

* 
[VK_FORMAT_R16_UNORM](#VkFormat) specifies a one-component, 16-bit unsigned
normalized format that has a single 16-bit R component.

* 
[VK_FORMAT_R16_SNORM](#VkFormat) specifies a one-component, 16-bit signed
normalized format that has a single 16-bit R component.

* 
[VK_FORMAT_R16_USCALED](#VkFormat) specifies a one-component, 16-bit unsigned
scaled integer format that has a single 16-bit R component.

* 
[VK_FORMAT_R16_SSCALED](#VkFormat) specifies a one-component, 16-bit signed
scaled integer format that has a single 16-bit R component.

* 
[VK_FORMAT_R16_UINT](#VkFormat) specifies a one-component, 16-bit unsigned
integer format that has a single 16-bit R component.

* 
[VK_FORMAT_R16_SINT](#VkFormat) specifies a one-component, 16-bit signed
integer format that has a single 16-bit R component.

* 
[VK_FORMAT_R16_SFLOAT](#VkFormat) specifies a one-component, 16-bit signed
floating-point format that has a single 16-bit R component.

* 
[VK_FORMAT_R16G16_UNORM](#VkFormat) specifies a two-component, 32-bit unsigned
normalized format that has a 16-bit R component in bytes 0..1, and a
16-bit G component in bytes 2..3.

* 
[VK_FORMAT_R16G16_SNORM](#VkFormat) specifies a two-component, 32-bit signed
normalized format that has a 16-bit R component in bytes 0..1, and a
16-bit G component in bytes 2..3.

* 
[VK_FORMAT_R16G16_USCALED](#VkFormat) specifies a two-component, 32-bit
unsigned scaled integer format that has a 16-bit R component in bytes
0..1, and a 16-bit G component in bytes 2..3.

* 
[VK_FORMAT_R16G16_SSCALED](#VkFormat) specifies a two-component, 32-bit signed
scaled integer format that has a 16-bit R component in bytes 0..1, and a
16-bit G component in bytes 2..3.

* 
[VK_FORMAT_R16G16_UINT](#VkFormat) specifies a two-component, 32-bit unsigned
integer format that has a 16-bit R component in bytes 0..1, and a 16-bit
G component in bytes 2..3.

* 
[VK_FORMAT_R16G16_SINT](#VkFormat) specifies a two-component, 32-bit signed
integer format that has a 16-bit R component in bytes 0..1, and a 16-bit
G component in bytes 2..3.

* 
[VK_FORMAT_R16G16_SFLOAT](#VkFormat) specifies a two-component, 32-bit signed
floating-point format that has a 16-bit R component in bytes 0..1, and a
16-bit G component in bytes 2..3.

* 
[VK_FORMAT_R16G16B16_UNORM](#VkFormat) specifies a three-component, 48-bit
unsigned normalized format that has a 16-bit R component in bytes 0..1,
a 16-bit G component in bytes 2..3, and a 16-bit B component in bytes
4..5.

* 
[VK_FORMAT_R16G16B16_SNORM](#VkFormat) specifies a three-component, 48-bit
signed normalized format that has a 16-bit R component in bytes 0..1, a
16-bit G component in bytes 2..3, and a 16-bit B component in bytes
4..5.

* 
[VK_FORMAT_R16G16B16_USCALED](#VkFormat) specifies a three-component, 48-bit
unsigned scaled integer format that has a 16-bit R component in bytes
0..1, a 16-bit G component in bytes 2..3, and a 16-bit B component in
bytes 4..5.

* 
[VK_FORMAT_R16G16B16_SSCALED](#VkFormat) specifies a three-component, 48-bit
signed scaled integer format that has a 16-bit R component in bytes
0..1, a 16-bit G component in bytes 2..3, and a 16-bit B component in
bytes 4..5.

* 
[VK_FORMAT_R16G16B16_UINT](#VkFormat) specifies a three-component, 48-bit
unsigned integer format that has a 16-bit R component in bytes 0..1, a
16-bit G component in bytes 2..3, and a 16-bit B component in bytes
4..5.

* 
[VK_FORMAT_R16G16B16_SINT](#VkFormat) specifies a three-component, 48-bit
signed integer format that has a 16-bit R component in bytes 0..1, a
16-bit G component in bytes 2..3, and a 16-bit B component in bytes
4..5.

* 
[VK_FORMAT_R16G16B16_SFLOAT](#VkFormat) specifies a three-component, 48-bit
signed floating-point format that has a 16-bit R component in bytes
0..1, a 16-bit G component in bytes 2..3, and a 16-bit B component in
bytes 4..5.

* 
[VK_FORMAT_R16G16B16A16_UNORM](#VkFormat) specifies a four-component, 64-bit
unsigned normalized format that has a 16-bit R component in bytes 0..1,
a 16-bit G component in bytes 2..3, a 16-bit B component in bytes 4..5,
and a 16-bit A component in bytes 6..7.

* 
[VK_FORMAT_R16G16B16A16_SNORM](#VkFormat) specifies a four-component, 64-bit
signed normalized format that has a 16-bit R component in bytes 0..1, a
16-bit G component in bytes 2..3, a 16-bit B component in bytes 4..5,
and a 16-bit A component in bytes 6..7.

* 
[VK_FORMAT_R16G16B16A16_USCALED](#VkFormat) specifies a four-component, 64-bit
unsigned scaled integer format that has a 16-bit R component in bytes
0..1, a 16-bit G component in bytes 2..3, a 16-bit B component in bytes
4..5, and a 16-bit A component in bytes 6..7.

* 
[VK_FORMAT_R16G16B16A16_SSCALED](#VkFormat) specifies a four-component, 64-bit
signed scaled integer format that has a 16-bit R component in bytes
0..1, a 16-bit G component in bytes 2..3, a 16-bit B component in bytes
4..5, and a 16-bit A component in bytes 6..7.

* 
[VK_FORMAT_R16G16B16A16_UINT](#VkFormat) specifies a four-component, 64-bit
unsigned integer format that has a 16-bit R component in bytes 0..1, a
16-bit G component in bytes 2..3, a 16-bit B component in bytes 4..5,
and a 16-bit A component in bytes 6..7.

* 
[VK_FORMAT_R16G16B16A16_SINT](#VkFormat) specifies a four-component, 64-bit
signed integer format that has a 16-bit R component in bytes 0..1, a
16-bit G component in bytes 2..3, a 16-bit B component in bytes 4..5,
and a 16-bit A component in bytes 6..7.

* 
[VK_FORMAT_R16G16B16A16_SFLOAT](#VkFormat) specifies a four-component, 64-bit
signed floating-point format that has a 16-bit R component in bytes
0..1, a 16-bit G component in bytes 2..3, a 16-bit B component in bytes
4..5, and a 16-bit A component in bytes 6..7.

* 
[VK_FORMAT_R32_UINT](#VkFormat) specifies a one-component, 32-bit unsigned
integer format that has a single 32-bit R component.

* 
[VK_FORMAT_R32_SINT](#VkFormat) specifies a one-component, 32-bit signed
integer format that has a single 32-bit R component.

* 
[VK_FORMAT_R32_SFLOAT](#VkFormat) specifies a one-component, 32-bit signed
floating-point format that has a single 32-bit R component.

* 
[VK_FORMAT_R32G32_UINT](#VkFormat) specifies a two-component, 64-bit unsigned
integer format that has a 32-bit R component in bytes 0..3, and a 32-bit
G component in bytes 4..7.

* 
[VK_FORMAT_R32G32_SINT](#VkFormat) specifies a two-component, 64-bit signed
integer format that has a 32-bit R component in bytes 0..3, and a 32-bit
G component in bytes 4..7.

* 
[VK_FORMAT_R32G32_SFLOAT](#VkFormat) specifies a two-component, 64-bit signed
floating-point format that has a 32-bit R component in bytes 0..3, and a
32-bit G component in bytes 4..7.

* 
[VK_FORMAT_R32G32B32_UINT](#VkFormat) specifies a three-component, 96-bit
unsigned integer format that has a 32-bit R component in bytes 0..3, a
32-bit G component in bytes 4..7, and a 32-bit B component in bytes
8..11.

* 
[VK_FORMAT_R32G32B32_SINT](#VkFormat) specifies a three-component, 96-bit
signed integer format that has a 32-bit R component in bytes 0..3, a
32-bit G component in bytes 4..7, and a 32-bit B component in bytes
8..11.

* 
[VK_FORMAT_R32G32B32_SFLOAT](#VkFormat) specifies a three-component, 96-bit
signed floating-point format that has a 32-bit R component in bytes
0..3, a 32-bit G component in bytes 4..7, and a 32-bit B component in
bytes 8..11.

* 
[VK_FORMAT_R32G32B32A32_UINT](#VkFormat) specifies a four-component, 128-bit
unsigned integer format that has a 32-bit R component in bytes 0..3, a
32-bit G component in bytes 4..7, a 32-bit B component in bytes 8..11,
and a 32-bit A component in bytes 12..15.

* 
[VK_FORMAT_R32G32B32A32_SINT](#VkFormat) specifies a four-component, 128-bit
signed integer format that has a 32-bit R component in bytes 0..3, a
32-bit G component in bytes 4..7, a 32-bit B component in bytes 8..11,
and a 32-bit A component in bytes 12..15.

* 
[VK_FORMAT_R32G32B32A32_SFLOAT](#VkFormat) specifies a four-component, 128-bit
signed floating-point format that has a 32-bit R component in bytes
0..3, a 32-bit G component in bytes 4..7, a 32-bit B component in bytes
8..11, and a 32-bit A component in bytes 12..15.

* 
[VK_FORMAT_R64_UINT](#VkFormat) specifies a one-component, 64-bit unsigned
integer format that has a single 64-bit R component.

* 
[VK_FORMAT_R64_SINT](#VkFormat) specifies a one-component, 64-bit signed
integer format that has a single 64-bit R component.

* 
[VK_FORMAT_R64_SFLOAT](#VkFormat) specifies a one-component, 64-bit signed
floating-point format that has a single 64-bit R component.

* 
[VK_FORMAT_R64G64_UINT](#VkFormat) specifies a two-component, 128-bit unsigned
integer format that has a 64-bit R component in bytes 0..7, and a 64-bit
G component in bytes 8..15.

* 
[VK_FORMAT_R64G64_SINT](#VkFormat) specifies a two-component, 128-bit signed
integer format that has a 64-bit R component in bytes 0..7, and a 64-bit
G component in bytes 8..15.

* 
[VK_FORMAT_R64G64_SFLOAT](#VkFormat) specifies a two-component, 128-bit signed
floating-point format that has a 64-bit R component in bytes 0..7, and a
64-bit G component in bytes 8..15.

* 
[VK_FORMAT_R64G64B64_UINT](#VkFormat) specifies a three-component, 192-bit
unsigned integer format that has a 64-bit R component in bytes 0..7, a
64-bit G component in bytes 8..15, and a 64-bit B component in bytes
16..23.

* 
[VK_FORMAT_R64G64B64_SINT](#VkFormat) specifies a three-component, 192-bit
signed integer format that has a 64-bit R component in bytes 0..7, a
64-bit G component in bytes 8..15, and a 64-bit B component in bytes
16..23.

* 
[VK_FORMAT_R64G64B64_SFLOAT](#VkFormat) specifies a three-component, 192-bit
signed floating-point format that has a 64-bit R component in bytes
0..7, a 64-bit G component in bytes 8..15, and a 64-bit B component in
bytes 16..23.

* 
[VK_FORMAT_R64G64B64A64_UINT](#VkFormat) specifies a four-component, 256-bit
unsigned integer format that has a 64-bit R component in bytes 0..7, a
64-bit G component in bytes 8..15, a 64-bit B component in bytes 16..23,
and a 64-bit A component in bytes 24..31.

* 
[VK_FORMAT_R64G64B64A64_SINT](#VkFormat) specifies a four-component, 256-bit
signed integer format that has a 64-bit R component in bytes 0..7, a
64-bit G component in bytes 8..15, a 64-bit B component in bytes 16..23,
and a 64-bit A component in bytes 24..31.

* 
[VK_FORMAT_R64G64B64A64_SFLOAT](#VkFormat) specifies a four-component, 256-bit
signed floating-point format that has a 64-bit R component in bytes
0..7, a 64-bit G component in bytes 8..15, a 64-bit B component in bytes
16..23, and a 64-bit A component in bytes 24..31.

* 
[VK_FORMAT_B10G11R11_UFLOAT_PACK32](#VkFormat) specifies a three-component,
32-bit packed unsigned floating-point format that has a 10-bit B
component in bits 22..31, an 11-bit G component in bits 11..21, an
11-bit R component in bits 0..10.
See [Unsigned 10-Bit Floating-Point Numbers](fundamentals.html#fundamentals-fp10) and [Unsigned 11-Bit Floating-Point Numbers](fundamentals.html#fundamentals-fp11).

* 
[VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](#VkFormat) specifies a three-component,
32-bit packed unsigned floating-point format that has a 5-bit shared
exponent in bits 27..31, a 9-bit B component mantissa in bits 18..26, a
9-bit G component mantissa in bits 9..17, and a 9-bit R component
mantissa in bits 0..8.

* 
[VK_FORMAT_D16_UNORM](#VkFormat) specifies a one-component, 16-bit unsigned
normalized format that has a single 16-bit depth component.

* 
[VK_FORMAT_X8_D24_UNORM_PACK32](#VkFormat) specifies a two-component, 32-bit
format that has 24 unsigned normalized bits in the depth component and,
**optionally**, 8 bits that are unused.

* 
[VK_FORMAT_D32_SFLOAT](#VkFormat) specifies a one-component, 32-bit signed
floating-point format that has 32 bits in the depth component.

* 
[VK_FORMAT_S8_UINT](#VkFormat) specifies a one-component, 8-bit unsigned
integer format that has 8 bits in the stencil component.

* 
[VK_FORMAT_D16_UNORM_S8_UINT](#VkFormat) specifies a two-component, 24-bit
format that has 16 unsigned normalized bits in the depth component and 8
unsigned integer bits in the stencil component.

* 
[VK_FORMAT_D24_UNORM_S8_UINT](#VkFormat) specifies a two-component, 32-bit
packed format that has 8 unsigned integer bits in the stencil component,
and 24 unsigned normalized bits in the depth component.

* 
[VK_FORMAT_D32_SFLOAT_S8_UINT](#VkFormat) specifies a two-component format that
has 32 signed float bits in the depth component and 8 unsigned integer
bits in the stencil component.
There are **optionally** 24 bits that are unused.

* 
[VK_FORMAT_BC1_RGB_UNORM_BLOCK](#VkFormat) specifies a three-component,
block-compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGB texel data.
This format has no alpha and is considered opaque.

* 
[VK_FORMAT_BC1_RGB_SRGB_BLOCK](#VkFormat) specifies a three-component,
block-compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGB texel data with sRGB
nonlinear encoding.
This format has no alpha and is considered opaque.

* 
[VK_FORMAT_BC1_RGBA_UNORM_BLOCK](#VkFormat) specifies a four-component,
block-compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGB texel data, and
provides 1 bit of alpha.

* 
[VK_FORMAT_BC1_RGBA_SRGB_BLOCK](#VkFormat) specifies a four-component,
block-compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGB texel data with sRGB
nonlinear encoding, and provides 1 bit of alpha.

* 
[VK_FORMAT_BC2_UNORM_BLOCK](#VkFormat) specifies a four-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of unsigned normalized RGBA texel data
with the first 64 bits encoding alpha values followed by 64 bits
encoding RGB values.

* 
[VK_FORMAT_BC2_SRGB_BLOCK](#VkFormat) specifies a four-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of unsigned normalized RGBA texel data
with the first 64 bits encoding alpha values followed by 64 bits
encoding RGB values with sRGB nonlinear encoding.

* 
[VK_FORMAT_BC3_UNORM_BLOCK](#VkFormat) specifies a four-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of unsigned normalized RGBA texel data
with the first 64 bits encoding alpha values followed by 64 bits
encoding RGB values.

* 
[VK_FORMAT_BC3_SRGB_BLOCK](#VkFormat) specifies a four-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of unsigned normalized RGBA texel data
with the first 64 bits encoding alpha values followed by 64 bits
encoding RGB values with sRGB nonlinear encoding.

* 
[VK_FORMAT_BC4_UNORM_BLOCK](#VkFormat) specifies a one-component,
block-compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized red texel data.

* 
[VK_FORMAT_BC4_SNORM_BLOCK](#VkFormat) specifies a one-component,
block-compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of signed normalized red texel data.

* 
[VK_FORMAT_BC5_UNORM_BLOCK](#VkFormat) specifies a two-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of unsigned normalized RG texel data with
the first 64 bits encoding red values followed by 64 bits encoding green
values.

* 
[VK_FORMAT_BC5_SNORM_BLOCK](#VkFormat) specifies a two-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of signed normalized RG texel data with
the first 64 bits encoding red values followed by 64 bits encoding green
values.

* 
[VK_FORMAT_BC6H_UFLOAT_BLOCK](#VkFormat) specifies a three-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of unsigned floating-point RGB texel data.

* 
[VK_FORMAT_BC6H_SFLOAT_BLOCK](#VkFormat) specifies a three-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of signed floating-point RGB texel data.

* 
[VK_FORMAT_BC7_UNORM_BLOCK](#VkFormat) specifies a four-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_BC7_SRGB_BLOCK](#VkFormat) specifies a four-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of unsigned normalized RGBA texel data
with sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ETC2_R8G8B8_UNORM_BLOCK](#VkFormat) specifies a three-component,
ETC2 compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGB texel data.
This format has no alpha and is considered opaque.

* 
[VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK](#VkFormat) specifies a three-component, ETC2
compressed format where each 64-bit compressed texel block encodes a
4×4 rectangle of unsigned normalized RGB texel data with sRGB
nonlinear encoding.
This format has no alpha and is considered opaque.

* 
[VK_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK](#VkFormat) specifies a four-component,
ETC2 compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGB texel data, and
provides 1 bit of alpha.

* 
[VK_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK](#VkFormat) specifies a four-component,
ETC2 compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGB texel data with sRGB
nonlinear encoding, and provides 1 bit of alpha.

* 
[VK_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK](#VkFormat) specifies a four-component,
ETC2 compressed format where each 128-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGBA texel data with the
first 64 bits encoding alpha values followed by 64 bits encoding RGB
values.

* 
[VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK](#VkFormat) specifies a four-component,
ETC2 compressed format where each 128-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGBA texel data with the
first 64 bits encoding alpha values followed by 64 bits encoding RGB
values with sRGB nonlinear encoding applied.

* 
[VK_FORMAT_EAC_R11_UNORM_BLOCK](#VkFormat) specifies a one-component, ETC2
compressed format where each 64-bit compressed texel block encodes a
4×4 rectangle of unsigned normalized red texel data.

* 
[VK_FORMAT_EAC_R11_SNORM_BLOCK](#VkFormat) specifies a one-component, ETC2
compressed format where each 64-bit compressed texel block encodes a
4×4 rectangle of signed normalized red texel data.

* 
[VK_FORMAT_EAC_R11G11_UNORM_BLOCK](#VkFormat) specifies a two-component, ETC2
compressed format where each 128-bit compressed texel block encodes a
4×4 rectangle of unsigned normalized RG texel data with the first
64 bits encoding red values followed by 64 bits encoding green values.

* 
[VK_FORMAT_EAC_R11G11_SNORM_BLOCK](#VkFormat) specifies a two-component, ETC2
compressed format where each 128-bit compressed texel block encodes a
4×4 rectangle of signed normalized RG texel data with the first 64
bits encoding red values followed by 64 bits encoding green values.

* 
[VK_FORMAT_ASTC_4x4_UNORM_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
4×4 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_4x4_SRGB_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
4×4 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
4×4 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_5x4_UNORM_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
5×4 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_5x4_SRGB_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
5×4 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
5×4 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_5x5_UNORM_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
5×5 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_5x5_SRGB_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
5×5 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
5×5 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_6x5_UNORM_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
6×5 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_6x5_SRGB_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
6×5 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
6×5 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_6x6_UNORM_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
6×6 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_6x6_SRGB_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
6×6 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
6×6 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_8x5_UNORM_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes an
8×5 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_8x5_SRGB_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes an
8×5 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
8×5 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_8x6_UNORM_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes an
8×6 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_8x6_SRGB_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes an
8×6 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
8×6 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_8x8_UNORM_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes an
8×8 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_8x8_SRGB_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes an
8×8 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
8×8 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_10x5_UNORM_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×5 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_10x5_SRGB_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×5 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×5 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_10x6_UNORM_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×6 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_10x6_SRGB_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×6 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×6 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_10x8_UNORM_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×8 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_10x8_SRGB_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×8 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×8 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_10x10_UNORM_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×10 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_10x10_SRGB_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×10 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×10 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_12x10_UNORM_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
12×10 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_12x10_SRGB_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
12×10 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
12×10 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_12x12_UNORM_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
12×12 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_12x12_SRGB_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
12×12 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK](#VkFormat) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
12×12 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_3x3x3_UNORM_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 3×3×3 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_3x3x3_SRGB_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 3×3×3 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_3x3x3_SFLOAT_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 3×3×3 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_4x3x3_UNORM_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×3×3 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_4x3x3_SRGB_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×3×3 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_4x3x3_SFLOAT_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×3×3 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_4x4x3_UNORM_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×4×3 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_4x4x3_SRGB_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×4×3 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_4x4x3_SFLOAT_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×4×3 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_4x4x4_UNORM_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×4×4 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_4x4x4_SRGB_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×4×4 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_4x4x4_SFLOAT_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×4×4 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_5x4x4_UNORM_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×4×4 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_5x4x4_SRGB_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×4×4 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_5x4x4_SFLOAT_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×4×4 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_5x5x4_UNORM_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×5×4 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_5x5x4_SRGB_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×5×4 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_5x5x4_SFLOAT_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×5×4 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_5x5x5_UNORM_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×5×5 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_5x5x5_SRGB_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×5×5 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_5x5x5_SFLOAT_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×5×5 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_6x5x5_UNORM_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×5×5 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_6x5x5_SRGB_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×5×5 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_6x5x5_SFLOAT_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×5×5 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_6x6x5_UNORM_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×6×5 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_6x6x5_SRGB_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×6×5 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_6x6x5_SFLOAT_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×6×5 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_6x6x6_UNORM_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×6×6 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_6x6x6_SRGB_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×6×6 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_6x6x6_SFLOAT_BLOCK_EXT](#VkFormat) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×6×6 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_G8B8G8R8_422_UNORM](#VkFormat) specifies a four-component, 32-bit
format containing a pair of G components, an R component, and a B
component, collectively encoding a 2×1 rectangle of unsigned
normalized RGB texel data.
One G value is present at each *i* coordinate, with the B and R values
shared across both G values and thus recorded at half the horizontal
resolution of the image.
This format has an 8-bit G component for the even *i* coordinate in byte
0, an 8-bit B component in byte 1, an 8-bit G component for the odd *i*
coordinate in byte 2, and an 8-bit R component in byte 3.
This format only supports images with a width that is a multiple of two.
For the purposes of the constraints on copy extents, this format is
treated as a compressed format with a 2×1 compressed texel block.

* 
[VK_FORMAT_B8G8R8G8_422_UNORM](#VkFormat) specifies a four-component, 32-bit
format containing a pair of G components, an R component, and a B
component, collectively encoding a 2×1 rectangle of unsigned
normalized RGB texel data.
One G value is present at each *i* coordinate, with the B and R values
shared across both G values and thus recorded at half the horizontal
resolution of the image.
This format has an 8-bit B component in byte 0, an 8-bit G component for
the even *i* coordinate in byte 1, an 8-bit R component in byte 2, and
an 8-bit G component for the odd *i* coordinate in byte 3.
This format only supports images with a width that is a multiple of two.
For the purposes of the constraints on copy extents, this format is
treated as a compressed format with a 2×1 compressed texel block.

* 
[VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM](#VkFormat) specifies an unsigned
normalized *multi-planar format* that has an 8-bit G component in plane
0, an 8-bit B component in plane 1, and an 8-bit R component in plane 2.
The horizontal and vertical dimensions of the R and B planes are halved
relative to the image dimensions, and each R and B component is shared
with the G components for which \(\left\lfloor i_G \times 0.5
\right\rfloor = i_B = i_R\) and \(\left\lfloor j_G \times 0.5
\right\rfloor = j_B = j_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits) for the R plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G8_B8R8_2PLANE_420_UNORM](#VkFormat) specifies an unsigned
normalized *multi-planar format* that has an 8-bit G component in plane
0, and a two-component, 16-bit BR plane 1 consisting of an 8-bit B
component in byte 0 and an 8-bit R component in byte 1.
The horizontal and vertical dimensions of the BR plane are halved
relative to the image dimensions, and each R and B value is shared with
the G components for which \(\left\lfloor i_G \times 0.5
\right\rfloor = i_B = i_R\) and \(\left\lfloor j_G \times 0.5
\right\rfloor = j_B = j_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the BR plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G8_B8_R8_3PLANE_422_UNORM](#VkFormat) specifies an unsigned
normalized *multi-planar format* that has an 8-bit G component in plane
0, an 8-bit B component in plane 1, and an 8-bit R component in plane 2.
The horizontal dimension of the R and B plane is halved relative to the
image dimensions, and each R and B value is shared with the G components
for which \(\left\lfloor i_G \times 0.5 \right\rfloor = i_B =
i_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits) for the R plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_G8_B8R8_2PLANE_422_UNORM](#VkFormat) specifies an unsigned
normalized *multi-planar format* that has an 8-bit G component in plane
0, and a two-component, 16-bit BR plane 1 consisting of an 8-bit B
component in byte 0 and an 8-bit R component in byte 1.
The horizontal dimension of the BR plane is halved relative to the image
dimensions, and each R and B value is shared with the G components for
which   .
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the BR plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_G8_B8_R8_3PLANE_444_UNORM](#VkFormat) specifies an unsigned
normalized *multi-planar format* that has an 8-bit G component in plane
0, an 8-bit B component in plane 1, and an 8-bit R component in plane 2.
Each plane has the same dimensions and each R, G, and B component
contributes to a single texel.
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits) for the R plane.

* 
[VK_FORMAT_R10X6_UNORM_PACK16](#VkFormat) specifies a one-component, 16-bit
unsigned normalized format that has a single 10-bit R component in the
top 10 bits of a 16-bit word, with the bottom 6 bits unused.

* 
[VK_FORMAT_R10X6G10X6_UNORM_2PACK16](#VkFormat) specifies a two-component,
32-bit unsigned normalized format that has a 10-bit R component in the
top 10 bits of the word in bytes 0..1, and a 10-bit G component in the
top 10 bits of the word in bytes 2..3, with the bottom 6 bits of each
word unused.

* 
[VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16](#VkFormat) specifies a
four-component, 64-bit unsigned normalized format that has a 10-bit R
component in the top 10 bits of the word in bytes 0..1, a 10-bit G
component in the top 10 bits of the word in bytes 2..3, a 10-bit B
component in the top 10 bits of the word in bytes 4..5, and a 10-bit A
component in the top 10 bits of the word in bytes 6..7, with the bottom
6 bits of each word unused.

* 
[VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16](#VkFormat) specifies a
four-component, 64-bit format containing a pair of G components, an R
component, and a B component, collectively encoding a 2×1
rectangle of unsigned normalized RGB texel data.
One G value is present at each *i* coordinate, with the B and R values
shared across both G values and thus recorded at half the horizontal
resolution of the image.
This format has a 10-bit G component for the even *i* coordinate in the
top 10 bits of the word in bytes 0..1, a 10-bit B component in the top
10 bits of the word in bytes 2..3, a 10-bit G component for the odd *i*
coordinate in the top 10 bits of the word in bytes 4..5, and a 10-bit R
component in the top 10 bits of the word in bytes 6..7, with the bottom
6 bits of each word unused.
This format only supports images with a width that is a multiple of two.
For the purposes of the constraints on copy extents, this format is
treated as a compressed format with a 2×1 compressed texel block.

* 
[VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16](#VkFormat) specifies a
four-component, 64-bit format containing a pair of G components, an R
component, and a B component, collectively encoding a 2×1
rectangle of unsigned normalized RGB texel data.
One G value is present at each *i* coordinate, with the B and R values
shared across both G values and thus recorded at half the horizontal
resolution of the image.
This format has a 10-bit B component in the top 10 bits of the word in
bytes 0..1, a 10-bit G component for the even *i* coordinate in the top
10 bits of the word in bytes 2..3, a 10-bit R component in the top 10
bits of the word in bytes 4..5, and a 10-bit G component for the odd *i*
coordinate in the top 10 bits of the word in bytes 6..7, with the bottom
6 bits of each word unused.
This format only supports images with a width that is a multiple of two.
For the purposes of the constraints on copy extents, this format is
treated as a compressed format with a 2×1 compressed texel block.

* 
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16](#VkFormat) specifies an
unsigned normalized *multi-planar format* that has a 10-bit G component
in the top 10 bits of each 16-bit word of plane 0, a 10-bit B component
in the top 10 bits of each 16-bit word of plane 1, and a 10-bit R
component in the top 10 bits of each 16-bit word of plane 2, with the
bottom 6 bits of each word unused.
The horizontal and vertical dimensions of the R and B planes are halved
relative to the image dimensions, and each R and B component is shared
with the G components for which \(\left\lfloor i_G \times 0.5
\right\rfloor = i_B = i_R\) and \(\left\lfloor j_G \times 0.5
\right\rfloor = j_B = j_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits) for the R plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16](#VkFormat) specifies an
unsigned normalized *multi-planar format* that has a 10-bit G component
in the top 10 bits of each 16-bit word of plane 0, and a two-component,
32-bit BR plane 1 consisting of a 10-bit B component in the top 10 bits
of the word in bytes 0..1, and a 10-bit R component in the top 10 bits
of the word in bytes 2..3, with the bottom 6 bits of each word unused.
The horizontal and vertical dimensions of the BR plane are halved
relative to the image dimensions, and each R and B value is shared with
the G components for which \(\left\lfloor i_G \times 0.5
\right\rfloor = i_B = i_R\) and \(\left\lfloor j_G \times 0.5
\right\rfloor = j_B = j_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the BR plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16](#VkFormat) specifies an
unsigned normalized *multi-planar format* that has a 10-bit G component
in the top 10 bits of each 16-bit word of plane 0, a 10-bit B component
in the top 10 bits of each 16-bit word of plane 1, and a 10-bit R
component in the top 10 bits of each 16-bit word of plane 2, with the
bottom 6 bits of each word unused.
The horizontal dimension of the R and B plane is halved relative to the
image dimensions, and each R and B value is shared with the G components
for which \(\left\lfloor i_G \times 0.5 \right\rfloor = i_B =
i_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits) for the R plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16](#VkFormat) specifies an
unsigned normalized *multi-planar format* that has a 10-bit G component
in the top 10 bits of each 16-bit word of plane 0, and a two-component,
32-bit BR plane 1 consisting of a 10-bit B component in the top 10 bits
of the word in bytes 0..1, and a 10-bit R component in the top 10 bits
of the word in bytes 2..3, with the bottom 6 bits of each word unused.
The horizontal dimension of the BR plane is halved relative to the image
dimensions, and each R and B value is shared with the G components for
which   .
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the BR plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16](#VkFormat) specifies an
unsigned normalized *multi-planar format* that has a 10-bit G component
in the top 10 bits of each 16-bit word of plane 0, a 10-bit B component
in the top 10 bits of each 16-bit word of plane 1, and a 10-bit R
component in the top 10 bits of each 16-bit word of plane 2, with the
bottom 6 bits of each word unused.
Each plane has the same dimensions and each R, G, and B component
contributes to a single texel.
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits) for the R plane.

* 
[VK_FORMAT_R12X4_UNORM_PACK16](#VkFormat) specifies a one-component, 16-bit
unsigned normalized format that has a single 12-bit R component in the
top 12 bits of a 16-bit word, with the bottom 4 bits unused.

* 
[VK_FORMAT_R12X4G12X4_UNORM_2PACK16](#VkFormat) specifies a two-component,
32-bit unsigned normalized format that has a 12-bit R component in the
top 12 bits of the word in bytes 0..1, and a 12-bit G component in the
top 12 bits of the word in bytes 2..3, with the bottom 4 bits of each
word unused.

* 
[VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16](#VkFormat) specifies a
four-component, 64-bit unsigned normalized format that has a 12-bit R
component in the top 12 bits of the word in bytes 0..1, a 12-bit G
component in the top 12 bits of the word in bytes 2..3, a 12-bit B
component in the top 12 bits of the word in bytes 4..5, and a 12-bit A
component in the top 12 bits of the word in bytes 6..7, with the bottom
4 bits of each word unused.

* 
[VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16](#VkFormat) specifies a
four-component, 64-bit format containing a pair of G components, an R
component, and a B component, collectively encoding a 2×1
rectangle of unsigned normalized RGB texel data.
One G value is present at each *i* coordinate, with the B and R values
shared across both G values and thus recorded at half the horizontal
resolution of the image.
This format has a 12-bit G component for the even *i* coordinate in the
top 12 bits of the word in bytes 0..1, a 12-bit B component in the top
12 bits of the word in bytes 2..3, a 12-bit G component for the odd *i*
coordinate in the top 12 bits of the word in bytes 4..5, and a 12-bit R
component in the top 12 bits of the word in bytes 6..7, with the bottom
4 bits of each word unused.
This format only supports images with a width that is a multiple of two.
For the purposes of the constraints on copy extents, this format is
treated as a compressed format with a 2×1 compressed texel block.

* 
[VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16](#VkFormat) specifies a
four-component, 64-bit format containing a pair of G components, an R
component, and a B component, collectively encoding a 2×1
rectangle of unsigned normalized RGB texel data.
One G value is present at each *i* coordinate, with the B and R values
shared across both G values and thus recorded at half the horizontal
resolution of the image.
This format has a 12-bit B component in the top 12 bits of the word in
bytes 0..1, a 12-bit G component for the even *i* coordinate in the top
12 bits of the word in bytes 2..3, a 12-bit R component in the top 12
bits of the word in bytes 4..5, and a 12-bit G component for the odd *i*
coordinate in the top 12 bits of the word in bytes 6..7, with the bottom
4 bits of each word unused.
This format only supports images with a width that is a multiple of two.
For the purposes of the constraints on copy extents, this format is
treated as a compressed format with a 2×1 compressed texel block.

* 
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16](#VkFormat) specifies an
unsigned normalized *multi-planar format* that has a 12-bit G component
in the top 12 bits of each 16-bit word of plane 0, a 12-bit B component
in the top 12 bits of each 16-bit word of plane 1, and a 12-bit R
component in the top 12 bits of each 16-bit word of plane 2, with the
bottom 4 bits of each word unused.
The horizontal and vertical dimensions of the R and B planes are halved
relative to the image dimensions, and each R and B component is shared
with the G components for which \(\left\lfloor i_G \times 0.5
\right\rfloor = i_B = i_R\) and \(\left\lfloor j_G \times 0.5
\right\rfloor = j_B = j_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits) for the R plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16](#VkFormat) specifies an
unsigned normalized *multi-planar format* that has a 12-bit G component
in the top 12 bits of each 16-bit word of plane 0, and a two-component,
32-bit BR plane 1 consisting of a 12-bit B component in the top 12 bits
of the word in bytes 0..1, and a 12-bit R component in the top 12 bits
of the word in bytes 2..3, with the bottom 4 bits of each word unused.
The horizontal and vertical dimensions of the BR plane are halved
relative to the image dimensions, and each R and B value is shared with
the G components for which \(\left\lfloor i_G \times 0.5
\right\rfloor = i_B = i_R\) and \(\left\lfloor j_G \times 0.5
\right\rfloor = j_B = j_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the BR plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16](#VkFormat) specifies an
unsigned normalized *multi-planar format* that has a 12-bit G component
in the top 12 bits of each 16-bit word of plane 0, a 12-bit B component
in the top 12 bits of each 16-bit word of plane 1, and a 12-bit R
component in the top 12 bits of each 16-bit word of plane 2, with the
bottom 4 bits of each word unused.
The horizontal dimension of the R and B plane is halved relative to the
image dimensions, and each R and B value is shared with the G components
for which \(\left\lfloor i_G \times 0.5 \right\rfloor = i_B =
i_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits) for the R plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16](#VkFormat) specifies an
unsigned normalized *multi-planar format* that has a 12-bit G component
in the top 12 bits of each 16-bit word of plane 0, and a two-component,
32-bit BR plane 1 consisting of a 12-bit B component in the top 12 bits
of the word in bytes 0..1, and a 12-bit R component in the top 12 bits
of the word in bytes 2..3, with the bottom 4 bits of each word unused.
The horizontal dimension of the BR plane is halved relative to the image
dimensions, and each R and B value is shared with the G components for
which   .
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the BR plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16](#VkFormat) specifies an
unsigned normalized *multi-planar format* that has a 12-bit G component
in the top 12 bits of each 16-bit word of plane 0, a 12-bit B component
in the top 12 bits of each 16-bit word of plane 1, and a 12-bit R
component in the top 12 bits of each 16-bit word of plane 2, with the
bottom 4 bits of each word unused.
Each plane has the same dimensions and each R, G, and B component
contributes to a single texel.
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits) for the R plane.

* 
[VK_FORMAT_G16B16G16R16_422_UNORM](#VkFormat) specifies a four-component,
64-bit format containing a pair of G components, an R component, and a B
component, collectively encoding a 2×1 rectangle of unsigned
normalized RGB texel data.
One G value is present at each *i* coordinate, with the B and R values
shared across both G values and thus recorded at half the horizontal
resolution of the image.
This format has a 16-bit G component for the even *i* coordinate in the
word in bytes 0..1, a 16-bit B component in the word in bytes 2..3, a
16-bit G component for the odd *i* coordinate in the word in bytes 4..5,
and a 16-bit R component in the word in bytes 6..7.
This format only supports images with a width that is a multiple of two.
For the purposes of the constraints on copy extents, this format is
treated as a compressed format with a 2×1 compressed texel block.

* 
[VK_FORMAT_B16G16R16G16_422_UNORM](#VkFormat) specifies a four-component,
64-bit format containing a pair of G components, an R component, and a B
component, collectively encoding a 2×1 rectangle of unsigned
normalized RGB texel data.
One G value is present at each *i* coordinate, with the B and R values
shared across both G values and thus recorded at half the horizontal
resolution of the image.
This format has a 16-bit B component in the word in bytes 0..1, a 16-bit
G component for the even *i* coordinate in the word in bytes 2..3, a
16-bit R component in the word in bytes 4..5, and a 16-bit G component
for the odd *i* coordinate in the word in bytes 6..7.
This format only supports images with a width that is a multiple of two.
For the purposes of the constraints on copy extents, this format is
treated as a compressed format with a 2×1 compressed texel block.

* 
[VK_FORMAT_G16_B16_R16_3PLANE_420_UNORM](#VkFormat) specifies an unsigned
normalized *multi-planar format* that has a 16-bit G component in each
16-bit word of plane 0, a 16-bit B component in each 16-bit word of
plane 1, and a 16-bit R component in each 16-bit word of plane 2.
The horizontal and vertical dimensions of the R and B planes are halved
relative to the image dimensions, and each R and B component is shared
with the G components for which \(\left\lfloor i_G \times 0.5
\right\rfloor = i_B = i_R\) and \(\left\lfloor j_G \times 0.5
\right\rfloor = j_B = j_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits) for the R plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G16_B16R16_2PLANE_420_UNORM](#VkFormat) specifies an unsigned
normalized *multi-planar format* that has a 16-bit G component in each
16-bit word of plane 0, and a two-component, 32-bit BR plane 1
consisting of a 16-bit B component in the word in bytes 0..1, and a
16-bit R component in the word in bytes 2..3.
The horizontal and vertical dimensions of the BR plane are halved
relative to the image dimensions, and each R and B value is shared with
the G components for which \(\left\lfloor i_G \times 0.5
\right\rfloor = i_B = i_R\) and \(\left\lfloor j_G \times 0.5
\right\rfloor = j_B = j_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the BR plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G16_B16_R16_3PLANE_422_UNORM](#VkFormat) specifies an unsigned
normalized *multi-planar format* that has a 16-bit G component in each
16-bit word of plane 0, a 16-bit B component in each 16-bit word of
plane 1, and a 16-bit R component in each 16-bit word of plane 2.
The horizontal dimension of the R and B plane is halved relative to the
image dimensions, and each R and B value is shared with the G components
for which \(\left\lfloor i_G \times 0.5 \right\rfloor = i_B =
i_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits) for the R plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_G16_B16R16_2PLANE_422_UNORM](#VkFormat) specifies an unsigned
normalized *multi-planar format* that has a 16-bit G component in each
16-bit word of plane 0, and a two-component, 32-bit BR plane 1
consisting of a 16-bit B component in the word in bytes 0..1, and a
16-bit R component in the word in bytes 2..3.
The horizontal dimension of the BR plane is halved relative to the image
dimensions, and each R and B value is shared with the G components for
which   .
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the BR plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_G16_B16_R16_3PLANE_444_UNORM](#VkFormat) specifies an unsigned
normalized *multi-planar format* that has a 16-bit G component in each
16-bit word of plane 0, a 16-bit B component in each 16-bit word of
plane 1, and a 16-bit R component in each 16-bit word of plane 2.
Each plane has the same dimensions and each R, G, and B component
contributes to a single texel.
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits) for the R plane.

* 
[VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](#VkFormat) specifies an unsigned
normalized *multi-planar format* that has an 8-bit G component in plane
0, and a two-component, 16-bit BR plane 1 consisting of an 8-bit B
component in byte 0 and an 8-bit R component in byte 1.
Both planes have the same dimensions and each R, G, and B component
contributes to a single texel.
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the BR plane.

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](#VkFormat) specifies an
unsigned normalized *multi-planar format* that has a 10-bit G component
in the top 10 bits of each 16-bit word of plane 0, and a two-component,
32-bit BR plane 1 consisting of a 10-bit B component in the top 10 bits
of the word in bytes 0..1, and a 10-bit R component in the top 10 bits
of the word in bytes 2..3, the bottom 6 bits of each word unused.
Both planes have the same dimensions and each R, G, and B component
contributes to a single texel.
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the BR plane.

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](#VkFormat) specifies an
unsigned normalized *multi-planar format* that has a 12-bit G component
in the top 12 bits of each 16-bit word of plane 0, and a two-component,
32-bit BR plane 1 consisting of a 12-bit B component in the top 12 bits
of the word in bytes 0..1, and a 12-bit R component in the top 12 bits
of the word in bytes 2..3, the bottom 4 bits of each word unused.
Both planes have the same dimensions and each R, G, and B component
contributes to a single texel.
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the BR plane.

* 
[VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](#VkFormat) specifies an unsigned
normalized *multi-planar format* that has a 16-bit G component in each
16-bit word of plane 0, and a two-component, 32-bit BR plane 1
consisting of a 16-bit B component in the word in bytes 0..1, and a
16-bit R component in the word in bytes 2..3.
Both planes have the same dimensions and each R, G, and B component
contributes to a single texel.
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the BR plane.

* 
[VK_FORMAT_PVRTC1_2BPP_UNORM_BLOCK_IMG](#VkFormat) specifies a four-component,
PVRTC compressed format where each 64-bit compressed texel block encodes
an 8×4 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_PVRTC1_4BPP_UNORM_BLOCK_IMG](#VkFormat) specifies a four-component,
PVRTC compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_PVRTC2_2BPP_UNORM_BLOCK_IMG](#VkFormat) specifies a four-component,
PVRTC compressed format where each 64-bit compressed texel block encodes
an 8×4 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_PVRTC2_4BPP_UNORM_BLOCK_IMG](#VkFormat) specifies a four-component,
PVRTC compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_PVRTC1_2BPP_SRGB_BLOCK_IMG](#VkFormat) specifies a four-component,
PVRTC compressed format where each 64-bit compressed texel block encodes
an 8×4 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_PVRTC1_4BPP_SRGB_BLOCK_IMG](#VkFormat) specifies a four-component,
PVRTC compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_PVRTC2_2BPP_SRGB_BLOCK_IMG](#VkFormat) specifies a four-component,
PVRTC compressed format where each 64-bit compressed texel block encodes
an 8×4 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_PVRTC2_4BPP_SRGB_BLOCK_IMG](#VkFormat) specifies a four-component,
PVRTC compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_R16G16_SFIXED5_NV](#VkFormat) specifies a two-component, 16-bit
signed fixed-point format with linear encoding.
The components are signed two’s-complement integers where the most
significant bit specifies the sign bit, the next 10 bits specify the
integer value, and the last 5 bits represent the fractional value.
The signed 16-bit values **can** be converted to floats in the range
[-1024,1023.96875] by dividing the value by 32 (25).

* 
[VK_FORMAT_R10X6_UINT_PACK16_ARM](#VkFormat) specifies a one-component, 16-bit
unsigned integer format that has a single 10-bit R component in the top
10 bits of a 16-bit word, with the bottom 6 bits unused.

* 
[VK_FORMAT_R10X6G10X6_UINT_2PACK16_ARM](#VkFormat) specifies a two-component,
32-bit unsigned integer format that has a 10-bit R component in the top
10 bits of the word in bytes 0..1, and a 10-bit G component in the top
10 bits of the word in bytes 2..3, with the bottom 6 bits of each word
unused.

* 
[VK_FORMAT_R10X6G10X6B10X6A10X6_UINT_4PACK16_ARM](#VkFormat) specifies a
four-component, 64-bit unsigned integer format that has a 10-bit R
component in the top 10 bits of the word in bytes 0..1, a 10-bit G
component in the top 10 bits of the word in bytes 2..3, a 10-bit B
component in the top 10 bits of the word in bytes 4..5, and a 10-bit A
component in the top 10 bits of the word in bytes 6..7, with the bottom
6 bits of each word unused.

* 
[VK_FORMAT_R12X4_UINT_PACK16_ARM](#VkFormat) specifies a one-component, 16-bit
unsigned integer format that has a single 12-bit R component in the top
12 bits of a 16-bit word, with the bottom 4 bits unused.

* 
[VK_FORMAT_R12X4G12X4_UINT_2PACK16_ARM](#VkFormat) specifies a two-component,
32-bit unsigned integer format that has a 12-bit R component in the top
12 bits of the word in bytes 0..1, and a 12-bit G component in the top
12 bits of the word in bytes 2..3, with the bottom 4 bits of each word
unused.

* 
[VK_FORMAT_R12X4G12X4B12X4A12X4_UINT_4PACK16_ARM](#VkFormat) specifies a
four-component, 64-bit unsigned integer format that has a 12-bit R
component in the top 12 bits of the word in bytes 0..1, a 12-bit G
component in the top 12 bits of the word in bytes 2..3, a 12-bit B
component in the top 12 bits of the word in bytes 4..5, and a 12-bit A
component in the top 12 bits of the word in bytes 6..7, with the bottom
4 bits of each word unused.

* 
[VK_FORMAT_R14X2_UINT_PACK16_ARM](#VkFormat) specifies a one-component, 16-bit
unsigned integer format that has a single 14-bit R component in the top
14 bits of a 16-bit word, with the bottom 2 bits unused.

* 
[VK_FORMAT_R14X2G14X2_UINT_2PACK16_ARM](#VkFormat) specifies a two-component,
32-bit unsigned integer format that has a 14-bit R component in the top
14 bits of the word in bytes 0..1, and a 14-bit G component in the top
14 bits of the word in bytes 2..3, with the bottom 2 bits of each word
unused.

* 
[VK_FORMAT_R14X2G14X2B14X2A14X2_UINT_4PACK16_ARM](#VkFormat) specifies a
four-component, 64-bit unsigned integer format that has a 14-bit R
component in the top 14 bits of the word in bytes 0..1, a 14-bit G
component in the top 14 bits of the word in bytes 2..3, a 14-bit B
component in the top 14 bits of the word in bytes 4..5, and a 14-bit A
component in the top 14 bits of the word in bytes 6..7, with the bottom
2 bits of each word unused.

* 
[VK_FORMAT_R14X2_UNORM_PACK16_ARM](#VkFormat) specifies a one-component, 16-bit
unsigned normalized format that has a single 14-bit R component in the
top 14 bits of a 16-bit word, with the bottom 2 bits unused.

* 
[VK_FORMAT_R14X2G14X2_UNORM_2PACK16_ARM](#VkFormat) specifies a two-component,
32-bit unsigned normalized format that has a 14-bit R component in the
top 14 bits of the word in bytes 0..1, and a 14-bit G component in the
top 14 bits of the word in bytes 2..3, with the bottom 2 bits of each
word unused.

* 
[VK_FORMAT_R14X2G14X2B14X2A14X2_UNORM_4PACK16_ARM](#VkFormat) specifies a
four-component, 64-bit unsigned normalized format that has a 14-bit R
component in the top 14 bits of the word in bytes 0..1, a 14-bit G
component in the top 14 bits of the word in bytes 2..3, a 14-bit B
component in the top 14 bits of the word in bytes 4..5, and a 14-bit A
component in the top 14 bits of the word in bytes 6..7, with the bottom
2 bits of each word unused.

* 
[VK_FORMAT_G14X2_B14X2R14X2_2PLANE_420_UNORM_3PACK16_ARM](#VkFormat) specifies
an unsigned normalized *multi-planar format* that has a 14-bit G
component in the top 14 bits of each 16-bit word of plane 0, and a
two-component, 32-bit BR plane 1 consisting of a 14-bit B component in
the top 14 bits of the word in bytes 0..1, and a 14-bit R component in
the top 14 bits of the word in bytes 2..3, with the bottom 2 bits of
each word unused.
The horizontal and vertical dimensions of the BR plane are halved
relative to the image dimensions, and each R and B value is shared with
the G components for which \(\left\lfloor i_G \times 0.5
\right\rfloor = i_B = i_R\) and \(\left\lfloor j_G \times 0.5
\right\rfloor = j_B = j_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the BR plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G14X2_B14X2R14X2_2PLANE_422_UNORM_3PACK16_ARM](#VkFormat) specifies
an unsigned normalized *multi-planar format* that has a 14-bit G
component in the top 14 bits of each 16-bit word of plane 0, and a
two-component, 32-bit BR plane 1 consisting of a 14-bit B component in
the top 14 bits of the word in bytes 0..1, and a 14-bit R component in
the top 14 bits of the word in bytes 2..3, with the bottom 2 bits of
each word unused.
The horizontal dimension of the BR plane is halved relative to the image
dimensions, and each R and B value is shared with the G components for
which   .
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) for the BR plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_R8_BOOL_ARM](#VkFormat) specifies a one-component 8-bit boolean
format that has a single 8-bit R component.
See [8-bit booleans](fundamentals.html#fundamentals-bool).

* 
[VK_FORMAT_R16_SFLOAT_FPENCODING_BFLOAT16_ARM](#VkFormat) specifies a
one-component, 16-bit signed floating-point format with BFLOAT16
encoding that has a single 16-bit R component.

* 
[VK_FORMAT_R8_SFLOAT_FPENCODING_FLOAT8E4M3_ARM](#VkFormat) specifies a
one-component, 8-bit signed floating-point format with FLOAT8E4M3
encoding that has a single 8-bit R component.

* 
[VK_FORMAT_R8_SFLOAT_FPENCODING_FLOAT8E5M2_ARM](#VkFormat) specifies a
one-component, 8-bit signed floating-point format with FLOAT8E5M2
encoding that has a single 8-bit R component.

Individual planes of [multi-planar formats](#formats-multiplanar) are
size-compatible with single-plane color formats if they occupy the same
number of bits per texel block, and are compatible with those formats if
they have the same block extent.

In the following table, individual planes of a *multi-planar* format are
compatible with the format listed against the relevant plane index for that
multi-planar format, and any format compatible with the listed single-plane
format according to [Format Compatibility Classes](#formats-compatibility-classes).
These planes are also [size-compatible](#formats-size-compatibility) with
any format that is [size-compatible](#formats-size-compatibility) with the
listed single-plane format.

| Plane | Compatible format for plane | Width relative to the width *w* of the plane with the largest dimensions | Height relative to the height *h* of the plane with the largest dimensions |
| --- | --- | --- | --- |
| **[VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM](#VkFormat)** |
| 0 | [VK_FORMAT_R8_UNORM](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R8_UNORM](#VkFormat) | w/2 | h/2 |
| 2 | [VK_FORMAT_R8_UNORM](#VkFormat) | w/2 | h/2 |
| **[VK_FORMAT_G8_B8R8_2PLANE_420_UNORM](#VkFormat)** |
| 0 | [VK_FORMAT_R8_UNORM](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R8G8_UNORM](#VkFormat) | w/2 | h/2 |
| **[VK_FORMAT_G8_B8_R8_3PLANE_422_UNORM](#VkFormat)** |
| 0 | [VK_FORMAT_R8_UNORM](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R8_UNORM](#VkFormat) | w/2 | h |
| 2 | [VK_FORMAT_R8_UNORM](#VkFormat) | w/2 | h |
| **[VK_FORMAT_G8_B8R8_2PLANE_422_UNORM](#VkFormat)** |
| 0 | [VK_FORMAT_R8_UNORM](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R8G8_UNORM](#VkFormat) | w/2 | h |
| **[VK_FORMAT_G8_B8_R8_3PLANE_444_UNORM](#VkFormat)** |
| 0 | [VK_FORMAT_R8_UNORM](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R8_UNORM](#VkFormat) | w | h |
| 2 | [VK_FORMAT_R8_UNORM](#VkFormat) | w | h |
| **[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16](#VkFormat)** |
| 0 | [VK_FORMAT_R10X6_UNORM_PACK16](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R10X6_UNORM_PACK16](#VkFormat) | w/2 | h/2 |
| 2 | [VK_FORMAT_R10X6_UNORM_PACK16](#VkFormat) | w/2 | h/2 |
| **[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16](#VkFormat)** |
| 0 | [VK_FORMAT_R10X6_UNORM_PACK16](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R10X6G10X6_UNORM_2PACK16](#VkFormat) | w/2 | h/2 |
| **[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16](#VkFormat)** |
| 0 | [VK_FORMAT_R10X6_UNORM_PACK16](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R10X6_UNORM_PACK16](#VkFormat) | w/2 | h |
| 2 | [VK_FORMAT_R10X6_UNORM_PACK16](#VkFormat) | w/2 | h |
| **[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16](#VkFormat)** |
| 0 | [VK_FORMAT_R10X6_UNORM_PACK16](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R10X6G10X6_UNORM_2PACK16](#VkFormat) | w/2 | h |
| **[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16](#VkFormat)** |
| 0 | [VK_FORMAT_R10X6_UNORM_PACK16](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R10X6_UNORM_PACK16](#VkFormat) | w | h |
| 2 | [VK_FORMAT_R10X6_UNORM_PACK16](#VkFormat) | w | h |
| **[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16](#VkFormat)** |
| 0 | [VK_FORMAT_R12X4_UNORM_PACK16](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R12X4_UNORM_PACK16](#VkFormat) | w/2 | h/2 |
| 2 | [VK_FORMAT_R12X4_UNORM_PACK16](#VkFormat) | w/2 | h/2 |
| **[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16](#VkFormat)** |
| 0 | [VK_FORMAT_R12X4_UNORM_PACK16](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R12X4G12X4_UNORM_2PACK16](#VkFormat) | w/2 | h/2 |
| **[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16](#VkFormat)** |
| 0 | [VK_FORMAT_R12X4_UNORM_PACK16](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R12X4_UNORM_PACK16](#VkFormat) | w/2 | h |
| 2 | [VK_FORMAT_R12X4_UNORM_PACK16](#VkFormat) | w/2 | h |
| **[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16](#VkFormat)** |
| 0 | [VK_FORMAT_R12X4_UNORM_PACK16](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R12X4G12X4_UNORM_2PACK16](#VkFormat) | w/2 | h |
| **[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16](#VkFormat)** |
| 0 | [VK_FORMAT_R12X4_UNORM_PACK16](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R12X4_UNORM_PACK16](#VkFormat) | w | h |
| 2 | [VK_FORMAT_R12X4_UNORM_PACK16](#VkFormat) | w | h |
| **[VK_FORMAT_G16_B16_R16_3PLANE_420_UNORM](#VkFormat)** |
| 0 | [VK_FORMAT_R16_UNORM](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R16_UNORM](#VkFormat) | w/2 | h/2 |
| 2 | [VK_FORMAT_R16_UNORM](#VkFormat) | w/2 | h/2 |
| **[VK_FORMAT_G16_B16R16_2PLANE_420_UNORM](#VkFormat)** |
| 0 | [VK_FORMAT_R16_UNORM](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R16G16_UNORM](#VkFormat) | w/2 | h/2 |
| **[VK_FORMAT_G16_B16_R16_3PLANE_422_UNORM](#VkFormat)** |
| 0 | [VK_FORMAT_R16_UNORM](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R16_UNORM](#VkFormat) | w/2 | h |
| 2 | [VK_FORMAT_R16_UNORM](#VkFormat) | w/2 | h |
| **[VK_FORMAT_G16_B16R16_2PLANE_422_UNORM](#VkFormat)** |
| 0 | [VK_FORMAT_R16_UNORM](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R16G16_UNORM](#VkFormat) | w/2 | h |
| **[VK_FORMAT_G16_B16_R16_3PLANE_444_UNORM](#VkFormat)** |
| 0 | [VK_FORMAT_R16_UNORM](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R16_UNORM](#VkFormat) | w | h |
| 2 | [VK_FORMAT_R16_UNORM](#VkFormat) | w | h |
| **[VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](#VkFormat)** |
| 0 | [VK_FORMAT_R8_UNORM](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R8G8_UNORM](#VkFormat) | w | h |
| **[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](#VkFormat)** |
| 0 | [VK_FORMAT_R10X6_UNORM_PACK16](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R10X6G10X6_UNORM_2PACK16](#VkFormat) | w | h |
| **[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](#VkFormat)** |
| 0 | [VK_FORMAT_R12X4_UNORM_PACK16](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R12X4G12X4_UNORM_2PACK16](#VkFormat) | w | h |
| **[VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](#VkFormat)** |
| 0 | [VK_FORMAT_R16_UNORM](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R16G16_UNORM](#VkFormat) | w | h |
| **[VK_FORMAT_G14X2_B14X2R14X2_2PLANE_420_UNORM_3PACK16_ARM](#VkFormat)** |
| 0 | [VK_FORMAT_R14X2_UNORM_PACK16_ARM](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R14X2G14X2_UNORM_2PACK16_ARM](#VkFormat) | w/2 | h/2 |
| **[VK_FORMAT_G14X2_B14X2R14X2_2PLANE_422_UNORM_3PACK16_ARM](#VkFormat)** |
| 0 | [VK_FORMAT_R14X2_UNORM_PACK16_ARM](#VkFormat) | w | h |
| 1 | [VK_FORMAT_R14X2G14X2_UNORM_2PACK16_ARM](#VkFormat) | w/2 | h |

If the [`maintenance8`](features.html#features-maintenance8) feature is enabled,
individual aspects of depth-stencil formats are size-compatible with certain
single-component color formats when performing bit-wise copy operations.
The following is a complete list of all per-aspect format compatibility
relations by size:

* 
32-bit depth ([VK_FORMAT_D32_SFLOAT](#VkFormat),
[VK_FORMAT_D32_SFLOAT_S8_UINT](#VkFormat))

[VK_FORMAT_R32_SFLOAT](#VkFormat), [VK_FORMAT_R32_SINT](#VkFormat),
[VK_FORMAT_R32_UINT](#VkFormat)

24-bit depth ([VK_FORMAT_X8_D24_UNORM_PACK32](#VkFormat),
[VK_FORMAT_D24_UNORM_S8_UINT](#VkFormat))

* 
[VK_FORMAT_R32_SFLOAT](#VkFormat), [VK_FORMAT_R32_SINT](#VkFormat),
[VK_FORMAT_R32_UINT](#VkFormat)

16-bit depth ([VK_FORMAT_D16_UNORM](#VkFormat),
[VK_FORMAT_D16_UNORM_S8_UINT](#VkFormat))

* 
[VK_FORMAT_R16_SFLOAT](#VkFormat), [VK_FORMAT_R16_UNORM](#VkFormat),
[VK_FORMAT_R16_SNORM](#VkFormat), [VK_FORMAT_R16_UINT](#VkFormat),
[VK_FORMAT_R16_SINT](#VkFormat)

8-bit stencil ([VK_FORMAT_S8_UINT](#VkFormat),
[VK_FORMAT_D16_UNORM_S8_UINT](#VkFormat), [VK_FORMAT_D24_UNORM_S8_UINT](#VkFormat),
[VK_FORMAT_D32_SFLOAT_S8_UINT](#VkFormat))

* 
[VK_FORMAT_R8_UINT](#VkFormat), [VK_FORMAT_R8_SINT](#VkFormat),
[VK_FORMAT_R8_UNORM](#VkFormat), [VK_FORMAT_R8_SNORM](#VkFormat)

When using [VkImageAspectFlagBits](resources.html#VkImageAspectFlagBits) to select a plane of a
[multi-planar format](#formats-multiplanar), the following are the valid
options:

* 
Two planes

[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits)

* 
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits)

Three planes

* 
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits)

* 
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits)

* 
[VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits)

For the purposes of address alignment when accessing buffer memory
containing vertex attribute or texel data, the following formats are
considered *packed* - components of the texels or attributes are stored in
bitfields packed into one or more 8-, 16-, or 32-bit fundamental data type.

* 
[Packed into 8-bit data types](#formats-packed-8-bit):

[VK_FORMAT_R4G4_UNORM_PACK8](#VkFormat)

[Packed into 16-bit data types](#formats-packed-16-bit):

* 
[VK_FORMAT_R4G4B4A4_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_B4G4R4A4_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_R5G6B5_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_B5G6R5_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_R5G5B5A1_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_B5G5R5A1_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_A1R5G5B5_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_A1B5G5R5_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_R10X6_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_R10X6G10X6_UNORM_2PACK16](#VkFormat)

* 
[VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16](#VkFormat)

* 
[VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16](#VkFormat)

* 
[VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16](#VkFormat)

* 
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16](#VkFormat)

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16](#VkFormat)

* 
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16](#VkFormat)

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16](#VkFormat)

* 
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16](#VkFormat)

* 
[VK_FORMAT_R12X4_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_R12X4G12X4_UNORM_2PACK16](#VkFormat)

* 
[VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16](#VkFormat)

* 
[VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16](#VkFormat)

* 
[VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16](#VkFormat)

* 
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16](#VkFormat)

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16](#VkFormat)

* 
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16](#VkFormat)

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16](#VkFormat)

* 
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16](#VkFormat)

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](#VkFormat)

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](#VkFormat)

* 
[VK_FORMAT_A4R4G4B4_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_A4B4G4R4_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_R10X6_UINT_PACK16_ARM](#VkFormat)

* 
[VK_FORMAT_R10X6G10X6_UINT_2PACK16_ARM](#VkFormat)

* 
[VK_FORMAT_R10X6G10X6B10X6A10X6_UINT_4PACK16_ARM](#VkFormat)

* 
[VK_FORMAT_R12X4_UINT_PACK16_ARM](#VkFormat)

* 
[VK_FORMAT_R12X4G12X4_UINT_2PACK16_ARM](#VkFormat)

* 
[VK_FORMAT_R12X4G12X4B12X4A12X4_UINT_4PACK16_ARM](#VkFormat)

* 
[VK_FORMAT_R14X2_UINT_PACK16_ARM](#VkFormat)

* 
[VK_FORMAT_R14X2G14X2_UINT_2PACK16_ARM](#VkFormat)

* 
[VK_FORMAT_R14X2G14X2B14X2A14X2_UINT_4PACK16_ARM](#VkFormat)

* 
[VK_FORMAT_R14X2_UNORM_PACK16_ARM](#VkFormat)

* 
[VK_FORMAT_R14X2G14X2_UNORM_2PACK16_ARM](#VkFormat)

* 
[VK_FORMAT_R14X2G14X2B14X2A14X2_UNORM_4PACK16_ARM](#VkFormat)

* 
[VK_FORMAT_G14X2_B14X2R14X2_2PLANE_420_UNORM_3PACK16_ARM](#VkFormat)

* 
[VK_FORMAT_G14X2_B14X2R14X2_2PLANE_422_UNORM_3PACK16_ARM](#VkFormat)

[Packed into 32-bit data types](#formats-packed-32-bit):

* 
[VK_FORMAT_A8B8G8R8_UNORM_PACK32](#VkFormat)

* 
[VK_FORMAT_A8B8G8R8_SNORM_PACK32](#VkFormat)

* 
[VK_FORMAT_A8B8G8R8_USCALED_PACK32](#VkFormat)

* 
[VK_FORMAT_A8B8G8R8_SSCALED_PACK32](#VkFormat)

* 
[VK_FORMAT_A8B8G8R8_UINT_PACK32](#VkFormat)

* 
[VK_FORMAT_A8B8G8R8_SINT_PACK32](#VkFormat)

* 
[VK_FORMAT_A8B8G8R8_SRGB_PACK32](#VkFormat)

* 
[VK_FORMAT_A2R10G10B10_UNORM_PACK32](#VkFormat)

* 
[VK_FORMAT_A2R10G10B10_SNORM_PACK32](#VkFormat)

* 
[VK_FORMAT_A2R10G10B10_USCALED_PACK32](#VkFormat)

* 
[VK_FORMAT_A2R10G10B10_SSCALED_PACK32](#VkFormat)

* 
[VK_FORMAT_A2R10G10B10_UINT_PACK32](#VkFormat)

* 
[VK_FORMAT_A2R10G10B10_SINT_PACK32](#VkFormat)

* 
[VK_FORMAT_A2B10G10R10_UNORM_PACK32](#VkFormat)

* 
[VK_FORMAT_A2B10G10R10_SNORM_PACK32](#VkFormat)

* 
[VK_FORMAT_A2B10G10R10_USCALED_PACK32](#VkFormat)

* 
[VK_FORMAT_A2B10G10R10_SSCALED_PACK32](#VkFormat)

* 
[VK_FORMAT_A2B10G10R10_UINT_PACK32](#VkFormat)

* 
[VK_FORMAT_A2B10G10R10_SINT_PACK32](#VkFormat)

* 
[VK_FORMAT_B10G11R11_UFLOAT_PACK32](#VkFormat)

* 
[VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](#VkFormat)

* 
[VK_FORMAT_X8_D24_UNORM_PACK32](#VkFormat)

A “format” is represented by a single enum value.
The name of a format is usually built up by using the following pattern:

    VK_FORMAT_{component-format|compression-scheme}_{numeric-format}

The component-format indicates either the size of the R, G, B, and A
components (if they are present) in the case of a color format, or the size
of the depth (D) and stencil (S) components (if they are present) in the
case of a depth/stencil format (see below).
An X indicates a component that is unused, but **may** be present for padding.

| Numeric format | Type-Declaration instructions | Numeric type | Description |
| --- | --- | --- | --- |
| `UNORM` | OpTypeFloat | floating-point | The components are unsigned normalized values in the range [0,1] |
| `SNORM` | OpTypeFloat | floating-point | The components are signed normalized values in the range [-1,1] |
| `USCALED` | OpTypeFloat | floating-point | The components are unsigned integer values that get converted to floating-point in the range [0,2n-1] |
| `SSCALED` | OpTypeFloat | floating-point | The components are signed integer values that get converted to floating-point in the range [-2n-1,2n-1-1] |
| `UINT` | OpTypeInt | unsigned integer | The components are unsigned integer values in the range [0,2n-1] |
| `SINT` | OpTypeInt | signed integer | The components are signed integer values in the range [-2n-1,2n-1-1] |
| `UFLOAT` | OpTypeFloat | floating-point | The components are unsigned floating-point numbers (used by packed, shared exponent, and some compressed formats) |
| `SFLOAT` | OpTypeFloat | floating-point | The components are signed floating-point numbers |
| `SRGB` | OpTypeFloat | floating-point | The R, G, and B components are unsigned normalized values that represent values using sRGB nonlinear encoding, while the A component (if one exists) is a regular unsigned normalized value |
| `SFIXED5` | OpTypeInt | scaled signed integer | The components are signed fractional integer values that get converted to floating-point in the range [-1024,1023.96875] |
| `BOOL` | OpTypeBool | boolean | The components are booleans |
| n is the number of bits in the component. |

The suffix `_PACKnn` indicates that the format is packed into an
underlying type with `nn` bits.
The suffix `_mPACKnn` is a short-hand that indicates that the format has
`m` groups of components (which may or may not be stored in separate
*planes*) that are each packed into an underlying type with `nn` bits.

The suffix `_BLOCK` indicates that the format is a block-compressed
format, with the representation of multiple texels encoded interdependently
within a region.

The suffix `_FPENCODING_` indicates that the format uses a
floating-point encoding, specified by ``, that is different from
IEEE754.

| FP Encoding | Description |
| --- | --- |
| FLOAT8E4M3 | 8-bit signed float with 4-bit mantissa and 3-bit exponent |
| FLOAT8E5M2 | 8-bit signed float with 5-bit mantissa and 2-bit exponent |
| BFLOAT16 | 16-bit signed float with 7-bit mantissa and 8-bit exponent (a.k.a. "brain float 16") |

| Compression scheme | Description |
| --- | --- |
| `BC` | Block Compression. See [Block-Compressed Image Formats](../appendices/compressedtex.html#appendix-compressedtex-bc). |
| `ETC2` | Ericsson Texture Compression. See [ETC Compressed Image Formats](../appendices/compressedtex.html#appendix-compressedtex-etc2). |
| `EAC` | ETC2 Alpha Compression. See [ETC Compressed Image Formats](../appendices/compressedtex.html#appendix-compressedtex-etc2). |
| `ASTC` | Adaptive Scalable Texture Compression (LDR Profile). See [ASTC Compressed Image Formats](../appendices/compressedtex.html#appendix-compressedtex-astc). |

For *multi-planar* images, the components in separate *planes* are separated
by underscores, and the number of planes is indicated by the addition of a
`_2PLANE` or `_3PLANE` suffix.
Similarly, the separate aspects of depth-stencil formats are separated by
underscores, although these are not considered separate planes.
Formats are suffixed by `_422` to indicate that planes other than the
first are reduced in size by a factor of two horizontally or that the R and
B values appear at half the horizontal frequency of the G values, `_420`
to indicate that planes other than the first are reduced in size by a factor
of two both horizontally and vertically, and `_444` for consistency to
indicate that all three planes of a three-planar image are the same size.

|  | No common format has a single plane containing both R and B components but
| --- | --- |
does not store these components at reduced horizontal resolution. |

Color formats **must** be represented in memory in exactly the form indicated
by the format’s name.
This means that promoting one format to another with more bits per component
and/or additional components **must** not occur for color formats.
Depth/stencil formats have more relaxed requirements as discussed
[below](#formats-depth-stencil).

Each format has a *texel block size*, the number of bytes used to store one
*texel block* (a single addressable element of an uncompressed image, or a
single compressed block of a compressed image).
The texel block size for each format is shown in the
[Compatible formats](#formats-compatibility) table.

The representation of non-packed formats is that the first component
specified in the name of the format is in the lowest memory addresses and
the last component specified is in the highest memory addresses.
See [Byte Mappings for Non-Packed/Compressed Color Formats](#formats-non-packed).
The in-memory ordering of bytes within a component is determined by the host
endianness.

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | ← Byte |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R | **`VK_FORMAT_R8_*`** |
| R | G | **`VK_FORMAT_R8G8_*`** |
| R | G | B | **`VK_FORMAT_R8G8B8_*`** |
| B | G | R | **`VK_FORMAT_B8G8R8_*`** |
| R | G | B | A | **`VK_FORMAT_R8G8B8A8_*`** |
| B | G | R | A | **`VK_FORMAT_B8G8R8A8_*`** |
| A | **[VK_FORMAT_A8_UNORM](#VkFormat)** |
| G0 | B | G1 | R | **[VK_FORMAT_G8B8G8R8_422_UNORM](#VkFormat)** |
| B | G0 | R | G1 | **[VK_FORMAT_B8G8R8G8_422_UNORM](#VkFormat)** |
| R | **`VK_FORMAT_R16_*`** |
| R | G | **`VK_FORMAT_R16G16_*`** |
| R | G | B | **`VK_FORMAT_R16G16B16_*`** |
| R | G | B | A | **`VK_FORMAT_R16G16B16A16_*`** |
| G0 | B | G1 | R | **`VK_FORMAT_G10X6B10X6G10X6R10X6_4PACK16_422_UNORM`
`VK_FORMAT_G12X4B12X4G12X4R12X4_4PACK16_422_UNORM`
`VK_FORMAT_G16B16G16R16_UNORM`** |
| B | G0 | R | G1 | **`VK_FORMAT_B10X6G10X6R10X6G10X6_4PACK16_422_UNORM`
`VK_FORMAT_B12X4G12X4R12X4G12X4_4PACK16_422_UNORM`
[VK_FORMAT_B16G16R16G16_422_UNORM](#VkFormat)** |
| R | **`VK_FORMAT_R32_*`** |
| R | G | **`VK_FORMAT_R32G32_*`** |
| R | G | B | **`VK_FORMAT_R32G32B32_*`** |
| R | G | B | A | **`VK_FORMAT_R32G32B32A32_*`** |
| R | **`VK_FORMAT_R64_*`** |
| R | G | **`VK_FORMAT_R64G64_*`** |
| **`VK_FORMAT_R64G64B64_*` as `VK_FORMAT_R64G64_*` but with B in bytes 16-23** |
| **`VK_FORMAT_R64G64B64A64_*` as `VK_FORMAT_R64G64B64_*` but with A in bytes 24-31** |

Packed formats store multiple components within one underlying type.
The bit representation is that the first component specified in the name of
the format is in the most-significant bits and the last component specified
is in the least-significant bits of the underlying type.
The in-memory ordering of bytes comprising the underlying type is determined
by the host endianness.

| Bit |
| --- |
| 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| [VK_FORMAT_R4G4_UNORM_PACK8](#VkFormat) |
| **R** | **G** |
| 3 | 2 | 1 | 0 | 3 | 2 | 1 | 0 |

| Bit |
| --- |
| 15 | 14 | 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| [VK_FORMAT_R4G4B4A4_UNORM_PACK16](#VkFormat) |
| **R** | **G** | **B** | **A** |
| 3 | 2 | 1 | 0 | 3 | 2 | 1 | 0 | 3 | 2 | 1 | 0 | 3 | 2 | 1 | 0 |
| [VK_FORMAT_B4G4R4A4_UNORM_PACK16](#VkFormat) |
| **B** | **G** | **R** | **A** |
| 3 | 2 | 1 | 0 | 3 | 2 | 1 | 0 | 3 | 2 | 1 | 0 | 3 | 2 | 1 | 0 |
| [VK_FORMAT_A4R4G4B4_UNORM_PACK16](#VkFormat) |
| **A** | **R** | **G** | **B** |
| 3 | 2 | 1 | 0 | 3 | 2 | 1 | 0 | 3 | 2 | 1 | 0 | 3 | 2 | 1 | 0 |
| [VK_FORMAT_A4B4G4R4_UNORM_PACK16](#VkFormat) |
| **A** | **B** | **G** | **R** |
| 3 | 2 | 1 | 0 | 3 | 2 | 1 | 0 | 3 | 2 | 1 | 0 | 3 | 2 | 1 | 0 |
| [VK_FORMAT_R5G6B5_UNORM_PACK16](#VkFormat) |
| **R** | **G** | **B** |
| 4 | 3 | 2 | 1 | 0 | 5 | 4 | 3 | 2 | 1 | 0 | 4 | 3 | 2 | 1 | 0 |
| [VK_FORMAT_B5G6R5_UNORM_PACK16](#VkFormat) |
| **B** | **G** | **R** |
| 4 | 3 | 2 | 1 | 0 | 5 | 4 | 3 | 2 | 1 | 0 | 4 | 3 | 2 | 1 | 0 |
| [VK_FORMAT_R5G5B5A1_UNORM_PACK16](#VkFormat) |
| **R** | **G** | **B** | **A** |
| 4 | 3 | 2 | 1 | 0 | 4 | 3 | 2 | 1 | 0 | 4 | 3 | 2 | 1 | 0 | 0 |
| [VK_FORMAT_B5G5R5A1_UNORM_PACK16](#VkFormat) |
| **B** | **G** | **R** | **A** |
| 4 | 3 | 2 | 1 | 0 | 4 | 3 | 2 | 1 | 0 | 4 | 3 | 2 | 1 | 0 | 0 |
| [VK_FORMAT_A1R5G5B5_UNORM_PACK16](#VkFormat) |
| **A** | **R** | **G** | **B** |
| 0 | 4 | 3 | 2 | 1 | 0 | 4 | 3 | 2 | 1 | 0 | 4 | 3 | 2 | 1 | 0 |
| [VK_FORMAT_A1B5G5R5_UNORM_PACK16](#VkFormat) |
| **A** | **B** | **G** | **R** |
| 0 | 4 | 3 | 2 | 1 | 0 | 4 | 3 | 2 | 1 | 0 | 4 | 3 | 2 | 1 | 0 |
| [VK_FORMAT_R10X6_UNORM_PACK16](#VkFormat) |
| **R** | **X** |
| 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | 5 | 4 | 3 | 2 | 1 | 0 |
| [VK_FORMAT_R12X4_UNORM_PACK16](#VkFormat) |
| **R** | **X** |
| 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | 3 | 2 | 1 | 0 |
| [VK_FORMAT_R10X6_UINT_PACK16_ARM](#VkFormat) |
| **R** | **X** |
| 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | 5 | 4 | 3 | 2 | 1 | 0 |
| [VK_FORMAT_R12X4_UINT_PACK16_ARM](#VkFormat) |
| **R** | **X** |
| 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | 3 | 2 | 1 | 0 |
| [VK_FORMAT_R14X2_UINT_PACK16_ARM](#VkFormat) |
| **R** | **X** |
| 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | 3 | 2 | 1 | 0 |

| Bit |
| --- |
| 31 | 30 | 29 | 28 | 27 | 26 | 25 | 24 | 23 | 22 | 21 | 20 | 19 | 18 | 17 | 16 | 15 | 14 | 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| `VK_FORMAT_A8B8G8R8_*_PACK32` |
| **A** | **B** | **G** | **R** |
| 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| `VK_FORMAT_A2R10G10B10_*_PACK32` |
| **A** | **R** | **G** | **B** |
| 1 | 0 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| `VK_FORMAT_A2B10G10R10_*_PACK32` |
| **A** | **B** | **G** | **R** |
| 1 | 0 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| [VK_FORMAT_B10G11R11_UFLOAT_PACK32](#VkFormat) |
| **B** | **G** | **R** |
| 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| [VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](#VkFormat) |
| **E** | **B** | **G** | **R** |
| 4 | 3 | 2 | 1 | 0 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
| [VK_FORMAT_X8_D24_UNORM_PACK32](#VkFormat) |
| **X** | **D** |
| 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 | 23 | 22 | 21 | 20 | 19 | 18 | 17 | 16 | 15 | 14 | 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |

Depth/stencil formats are considered opaque and need not be stored in the
exact number of bits per texel or component ordering indicated by the format
enum.
However, implementations **must** not substitute a different depth or stencil
precision than is described in the format (e.g. D16 **must** not be implemented
as D24 or D32).

Uncompressed color formats are *compatible* with each other if they occupy
the same number of bits per texel block
as long as neither or both are alpha formats (e.g.,
[VK_FORMAT_A8_UNORM](#VkFormat))
.
Compressed color formats are compatible with each other if the only
difference between them is the [numeric format](#formats-numericformat) of
the uncompressed texels.
Each depth/stencil format is only compatible with itself.
In the [following](#formats-compatibility) table, all the formats in the
same row are compatible.
Each format has a defined *texel block extent* specifying how many texels
each texel block represents in each dimension.

| Class, Texel Block Size, Texel Block Extent, # Texels/Block | Formats |
| --- | --- |
| 8-bit

  Block size 1 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_R8_BOOL_ARM](#VkFormat),

                    [VK_FORMAT_R8_SFLOAT_FPENCODING_FLOAT8E4M3_ARM](#VkFormat),

                    [VK_FORMAT_R8_SFLOAT_FPENCODING_FLOAT8E5M2_ARM](#VkFormat),

                    [VK_FORMAT_R4G4_UNORM_PACK8](#VkFormat),

                    [VK_FORMAT_R8_UNORM](#VkFormat),

                    [VK_FORMAT_R8_SNORM](#VkFormat),

                    [VK_FORMAT_R8_USCALED](#VkFormat),

                    [VK_FORMAT_R8_SSCALED](#VkFormat),

                    [VK_FORMAT_R8_UINT](#VkFormat),

                    [VK_FORMAT_R8_SINT](#VkFormat),

                    [VK_FORMAT_R8_SRGB](#VkFormat) |
| 16-bit

  Block size 2 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_A1B5G5R5_UNORM_PACK16](#VkFormat),

                    [VK_FORMAT_R10X6_UNORM_PACK16](#VkFormat),

                    [VK_FORMAT_R12X4_UNORM_PACK16](#VkFormat),

                    [VK_FORMAT_A4R4G4B4_UNORM_PACK16](#VkFormat),

                    [VK_FORMAT_A4B4G4R4_UNORM_PACK16](#VkFormat),

                    [VK_FORMAT_R10X6_UINT_PACK16_ARM](#VkFormat),

                    [VK_FORMAT_R12X4_UINT_PACK16_ARM](#VkFormat),

                    [VK_FORMAT_R14X2_UINT_PACK16_ARM](#VkFormat),

                    [VK_FORMAT_R14X2_UNORM_PACK16_ARM](#VkFormat),

                    [VK_FORMAT_R16_SFLOAT_FPENCODING_BFLOAT16_ARM](#VkFormat),

                    [VK_FORMAT_R4G4B4A4_UNORM_PACK16](#VkFormat),

                    [VK_FORMAT_B4G4R4A4_UNORM_PACK16](#VkFormat),

                    [VK_FORMAT_R5G6B5_UNORM_PACK16](#VkFormat),

                    [VK_FORMAT_B5G6R5_UNORM_PACK16](#VkFormat),

                    [VK_FORMAT_R5G5B5A1_UNORM_PACK16](#VkFormat),

                    [VK_FORMAT_B5G5R5A1_UNORM_PACK16](#VkFormat),

                    [VK_FORMAT_A1R5G5B5_UNORM_PACK16](#VkFormat),

                    [VK_FORMAT_R8G8_UNORM](#VkFormat),

                    [VK_FORMAT_R8G8_SNORM](#VkFormat),

                    [VK_FORMAT_R8G8_USCALED](#VkFormat),

                    [VK_FORMAT_R8G8_SSCALED](#VkFormat),

                    [VK_FORMAT_R8G8_UINT](#VkFormat),

                    [VK_FORMAT_R8G8_SINT](#VkFormat),

                    [VK_FORMAT_R8G8_SRGB](#VkFormat),

                    [VK_FORMAT_R16_UNORM](#VkFormat),

                    [VK_FORMAT_R16_SNORM](#VkFormat),

                    [VK_FORMAT_R16_USCALED](#VkFormat),

                    [VK_FORMAT_R16_SSCALED](#VkFormat),

                    [VK_FORMAT_R16_UINT](#VkFormat),

                    [VK_FORMAT_R16_SINT](#VkFormat),

                    [VK_FORMAT_R16_SFLOAT](#VkFormat) |
| 8-bit alpha

  Block size 1 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_A8_UNORM](#VkFormat) |
| 24-bit

  Block size 3 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_R8G8B8_UNORM](#VkFormat),

                    [VK_FORMAT_R8G8B8_SNORM](#VkFormat),

                    [VK_FORMAT_R8G8B8_USCALED](#VkFormat),

                    [VK_FORMAT_R8G8B8_SSCALED](#VkFormat),

                    [VK_FORMAT_R8G8B8_UINT](#VkFormat),

                    [VK_FORMAT_R8G8B8_SINT](#VkFormat),

                    [VK_FORMAT_R8G8B8_SRGB](#VkFormat),

                    [VK_FORMAT_B8G8R8_UNORM](#VkFormat),

                    [VK_FORMAT_B8G8R8_SNORM](#VkFormat),

                    [VK_FORMAT_B8G8R8_USCALED](#VkFormat),

                    [VK_FORMAT_B8G8R8_SSCALED](#VkFormat),

                    [VK_FORMAT_B8G8R8_UINT](#VkFormat),

                    [VK_FORMAT_B8G8R8_SINT](#VkFormat),

                    [VK_FORMAT_B8G8R8_SRGB](#VkFormat) |
| 32-bit

  Block size 4 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_R10X6G10X6_UNORM_2PACK16](#VkFormat),

                    [VK_FORMAT_R12X4G12X4_UNORM_2PACK16](#VkFormat),

                    [VK_FORMAT_R16G16_SFIXED5_NV](#VkFormat),

                    [VK_FORMAT_R10X6G10X6_UINT_2PACK16_ARM](#VkFormat),

                    [VK_FORMAT_R12X4G12X4_UINT_2PACK16_ARM](#VkFormat),

                    [VK_FORMAT_R14X2G14X2_UINT_2PACK16_ARM](#VkFormat),

                    [VK_FORMAT_R14X2G14X2_UNORM_2PACK16_ARM](#VkFormat),

                    [VK_FORMAT_R8G8B8A8_UNORM](#VkFormat),

                    [VK_FORMAT_R8G8B8A8_SNORM](#VkFormat),

                    [VK_FORMAT_R8G8B8A8_USCALED](#VkFormat),

                    [VK_FORMAT_R8G8B8A8_SSCALED](#VkFormat),

                    [VK_FORMAT_R8G8B8A8_UINT](#VkFormat),

                    [VK_FORMAT_R8G8B8A8_SINT](#VkFormat),

                    [VK_FORMAT_R8G8B8A8_SRGB](#VkFormat),

                    [VK_FORMAT_B8G8R8A8_UNORM](#VkFormat),

                    [VK_FORMAT_B8G8R8A8_SNORM](#VkFormat),

                    [VK_FORMAT_B8G8R8A8_USCALED](#VkFormat),

                    [VK_FORMAT_B8G8R8A8_SSCALED](#VkFormat),

                    [VK_FORMAT_B8G8R8A8_UINT](#VkFormat),

                    [VK_FORMAT_B8G8R8A8_SINT](#VkFormat),

                    [VK_FORMAT_B8G8R8A8_SRGB](#VkFormat),

                    [VK_FORMAT_A8B8G8R8_UNORM_PACK32](#VkFormat),

                    [VK_FORMAT_A8B8G8R8_SNORM_PACK32](#VkFormat),

                    [VK_FORMAT_A8B8G8R8_USCALED_PACK32](#VkFormat),

                    [VK_FORMAT_A8B8G8R8_SSCALED_PACK32](#VkFormat),

                    [VK_FORMAT_A8B8G8R8_UINT_PACK32](#VkFormat),

                    [VK_FORMAT_A8B8G8R8_SINT_PACK32](#VkFormat),

                    [VK_FORMAT_A8B8G8R8_SRGB_PACK32](#VkFormat),

                    [VK_FORMAT_A2R10G10B10_UNORM_PACK32](#VkFormat),

                    [VK_FORMAT_A2R10G10B10_SNORM_PACK32](#VkFormat),

                    [VK_FORMAT_A2R10G10B10_USCALED_PACK32](#VkFormat),

                    [VK_FORMAT_A2R10G10B10_SSCALED_PACK32](#VkFormat),

                    [VK_FORMAT_A2R10G10B10_UINT_PACK32](#VkFormat),

                    [VK_FORMAT_A2R10G10B10_SINT_PACK32](#VkFormat),

                    [VK_FORMAT_A2B10G10R10_UNORM_PACK32](#VkFormat),

                    [VK_FORMAT_A2B10G10R10_SNORM_PACK32](#VkFormat),

                    [VK_FORMAT_A2B10G10R10_USCALED_PACK32](#VkFormat),

                    [VK_FORMAT_A2B10G10R10_SSCALED_PACK32](#VkFormat),

                    [VK_FORMAT_A2B10G10R10_UINT_PACK32](#VkFormat),

                    [VK_FORMAT_A2B10G10R10_SINT_PACK32](#VkFormat),

                    [VK_FORMAT_R16G16_UNORM](#VkFormat),

                    [VK_FORMAT_R16G16_SNORM](#VkFormat),

                    [VK_FORMAT_R16G16_USCALED](#VkFormat),

                    [VK_FORMAT_R16G16_SSCALED](#VkFormat) |
| 32-bit (continued)

  Block size 4 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_R16G16_UINT](#VkFormat),

                    [VK_FORMAT_R16G16_SINT](#VkFormat),

                    [VK_FORMAT_R16G16_SFLOAT](#VkFormat),

                    [VK_FORMAT_R32_UINT](#VkFormat),

                    [VK_FORMAT_R32_SINT](#VkFormat),

                    [VK_FORMAT_R32_SFLOAT](#VkFormat),

                    [VK_FORMAT_B10G11R11_UFLOAT_PACK32](#VkFormat),

                    [VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](#VkFormat) |
| 48-bit

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_R16G16B16_UNORM](#VkFormat),

                    [VK_FORMAT_R16G16B16_SNORM](#VkFormat),

                    [VK_FORMAT_R16G16B16_USCALED](#VkFormat),

                    [VK_FORMAT_R16G16B16_SSCALED](#VkFormat),

                    [VK_FORMAT_R16G16B16_UINT](#VkFormat),

                    [VK_FORMAT_R16G16B16_SINT](#VkFormat),

                    [VK_FORMAT_R16G16B16_SFLOAT](#VkFormat) |
| 64-bit

  Block size 8 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_R16G16B16A16_UNORM](#VkFormat),

                    [VK_FORMAT_R16G16B16A16_SNORM](#VkFormat),

                    [VK_FORMAT_R16G16B16A16_USCALED](#VkFormat),

                    [VK_FORMAT_R16G16B16A16_SSCALED](#VkFormat),

                    [VK_FORMAT_R16G16B16A16_UINT](#VkFormat),

                    [VK_FORMAT_R16G16B16A16_SINT](#VkFormat),

                    [VK_FORMAT_R16G16B16A16_SFLOAT](#VkFormat),

                    [VK_FORMAT_R32G32_UINT](#VkFormat),

                    [VK_FORMAT_R32G32_SINT](#VkFormat),

                    [VK_FORMAT_R32G32_SFLOAT](#VkFormat),

                    [VK_FORMAT_R64_UINT](#VkFormat),

                    [VK_FORMAT_R64_SINT](#VkFormat),

                    [VK_FORMAT_R64_SFLOAT](#VkFormat) |
| 96-bit

  Block size 12 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_R32G32B32_UINT](#VkFormat),

                    [VK_FORMAT_R32G32B32_SINT](#VkFormat),

                    [VK_FORMAT_R32G32B32_SFLOAT](#VkFormat) |
| 128-bit

  Block size 16 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_R32G32B32A32_UINT](#VkFormat),

                    [VK_FORMAT_R32G32B32A32_SINT](#VkFormat),

                    [VK_FORMAT_R32G32B32A32_SFLOAT](#VkFormat),

                    [VK_FORMAT_R64G64_UINT](#VkFormat),

                    [VK_FORMAT_R64G64_SINT](#VkFormat),

                    [VK_FORMAT_R64G64_SFLOAT](#VkFormat) |
| 192-bit

  Block size 24 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_R64G64B64_UINT](#VkFormat),

                    [VK_FORMAT_R64G64B64_SINT](#VkFormat),

                    [VK_FORMAT_R64G64B64_SFLOAT](#VkFormat) |
| 256-bit

  Block size 32 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_R64G64B64A64_UINT](#VkFormat),

                    [VK_FORMAT_R64G64B64A64_SINT](#VkFormat),

                    [VK_FORMAT_R64G64B64A64_SFLOAT](#VkFormat) |
| D16

  Block size 2 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_D16_UNORM](#VkFormat) |
| D24

  Block size 4 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_X8_D24_UNORM_PACK32](#VkFormat) |
| D32

  Block size 4 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_D32_SFLOAT](#VkFormat) |
| S8

  Block size 1 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_S8_UINT](#VkFormat) |
| D16S8

  Block size 3 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_D16_UNORM_S8_UINT](#VkFormat) |
| D24S8

  Block size 4 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_D24_UNORM_S8_UINT](#VkFormat) |
| D32S8

  Block size 5 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_D32_SFLOAT_S8_UINT](#VkFormat) |
| BC1_RGB

  Block size 8 byte

  4x4x1 block extent

  16 texel/block | [VK_FORMAT_BC1_RGB_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_BC1_RGB_SRGB_BLOCK](#VkFormat) |
| BC1_RGBA

  Block size 8 byte

  4x4x1 block extent

  16 texel/block | [VK_FORMAT_BC1_RGBA_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_BC1_RGBA_SRGB_BLOCK](#VkFormat) |
| BC2

  Block size 16 byte

  4x4x1 block extent

  16 texel/block | [VK_FORMAT_BC2_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_BC2_SRGB_BLOCK](#VkFormat) |
| BC3

  Block size 16 byte

  4x4x1 block extent

  16 texel/block | [VK_FORMAT_BC3_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_BC3_SRGB_BLOCK](#VkFormat) |
| BC4

  Block size 8 byte

  4x4x1 block extent

  16 texel/block | [VK_FORMAT_BC4_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_BC4_SNORM_BLOCK](#VkFormat) |
| BC5

  Block size 16 byte

  4x4x1 block extent

  16 texel/block | [VK_FORMAT_BC5_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_BC5_SNORM_BLOCK](#VkFormat) |
| BC6H

  Block size 16 byte

  4x4x1 block extent

  16 texel/block | [VK_FORMAT_BC6H_UFLOAT_BLOCK](#VkFormat),

                    [VK_FORMAT_BC6H_SFLOAT_BLOCK](#VkFormat) |
| BC7

  Block size 16 byte

  4x4x1 block extent

  16 texel/block | [VK_FORMAT_BC7_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_BC7_SRGB_BLOCK](#VkFormat) |
| ETC2_RGB

  Block size 8 byte

  4x4x1 block extent

  16 texel/block | [VK_FORMAT_ETC2_R8G8B8_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK](#VkFormat) |
| ETC2_RGBA

  Block size 8 byte

  4x4x1 block extent

  16 texel/block | [VK_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK](#VkFormat) |
| ETC2_EAC_RGBA

  Block size 16 byte

  4x4x1 block extent

  16 texel/block | [VK_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK](#VkFormat) |
| EAC_R

  Block size 8 byte

  4x4x1 block extent

  16 texel/block | [VK_FORMAT_EAC_R11_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_EAC_R11_SNORM_BLOCK](#VkFormat) |
| EAC_RG

  Block size 16 byte

  4x4x1 block extent

  16 texel/block | [VK_FORMAT_EAC_R11G11_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_EAC_R11G11_SNORM_BLOCK](#VkFormat) |
| ASTC_4x4

  Block size 16 byte

  4x4x1 block extent

  16 texel/block | [VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_4x4_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_4x4_SRGB_BLOCK](#VkFormat) |
| ASTC_5x4

  Block size 16 byte

  5x4x1 block extent

  20 texel/block | [VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_5x4_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_5x4_SRGB_BLOCK](#VkFormat) |
| ASTC_5x5

  Block size 16 byte

  5x5x1 block extent

  25 texel/block | [VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_5x5_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_5x5_SRGB_BLOCK](#VkFormat) |
| ASTC_6x5

  Block size 16 byte

  6x5x1 block extent

  30 texel/block | [VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_6x5_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_6x5_SRGB_BLOCK](#VkFormat) |
| ASTC_6x6

  Block size 16 byte

  6x6x1 block extent

  36 texel/block | [VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_6x6_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_6x6_SRGB_BLOCK](#VkFormat) |
| ASTC_8x5

  Block size 16 byte

  8x5x1 block extent

  40 texel/block | [VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_8x5_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_8x5_SRGB_BLOCK](#VkFormat) |
| ASTC_8x6

  Block size 16 byte

  8x6x1 block extent

  48 texel/block | [VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_8x6_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_8x6_SRGB_BLOCK](#VkFormat) |
| ASTC_8x8

  Block size 16 byte

  8x8x1 block extent

  64 texel/block | [VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_8x8_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_8x8_SRGB_BLOCK](#VkFormat) |
| ASTC_10x5

  Block size 16 byte

  10x5x1 block extent

  50 texel/block | [VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_10x5_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_10x5_SRGB_BLOCK](#VkFormat) |
| ASTC_10x6

  Block size 16 byte

  10x6x1 block extent

  60 texel/block | [VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_10x6_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_10x6_SRGB_BLOCK](#VkFormat) |
| ASTC_10x8

  Block size 16 byte

  10x8x1 block extent

  80 texel/block | [VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_10x8_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_10x8_SRGB_BLOCK](#VkFormat) |
| ASTC_10x10

  Block size 16 byte

  10x10x1 block extent

  100 texel/block | [VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_10x10_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_10x10_SRGB_BLOCK](#VkFormat) |
| ASTC_12x10

  Block size 16 byte

  12x10x1 block extent

  120 texel/block | [VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_12x10_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_12x10_SRGB_BLOCK](#VkFormat) |
| ASTC_12x12

  Block size 16 byte

  12x12x1 block extent

  144 texel/block | [VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_12x12_UNORM_BLOCK](#VkFormat),

                    [VK_FORMAT_ASTC_12x12_SRGB_BLOCK](#VkFormat) |
| 32-bit G8B8G8R8

  Block size 4 byte

  2x1x1 block extent

  1 texel/block | [VK_FORMAT_G8B8G8R8_422_UNORM](#VkFormat) |
| 32-bit B8G8R8G8

  Block size 4 byte

  2x1x1 block extent

  1 texel/block | [VK_FORMAT_B8G8R8G8_422_UNORM](#VkFormat) |
| 8-bit 3-plane 420

  Block size 3 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM](#VkFormat) |
| 8-bit 2-plane 420

  Block size 3 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G8_B8R8_2PLANE_420_UNORM](#VkFormat) |
| 8-bit 3-plane 422

  Block size 3 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G8_B8_R8_3PLANE_422_UNORM](#VkFormat) |
| 8-bit 2-plane 422

  Block size 3 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G8_B8R8_2PLANE_422_UNORM](#VkFormat) |
| 8-bit 3-plane 444

  Block size 3 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G8_B8_R8_3PLANE_444_UNORM](#VkFormat) |
| 64-bit R10G10B10A10

  Block size 8 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16](#VkFormat),

                    [VK_FORMAT_R10X6G10X6B10X6A10X6_UINT_4PACK16_ARM](#VkFormat) |
| 64-bit G10B10G10R10

  Block size 8 byte

  2x1x1 block extent

  1 texel/block | [VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16](#VkFormat) |
| 64-bit B10G10R10G10

  Block size 8 byte

  2x1x1 block extent

  1 texel/block | [VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16](#VkFormat) |
| 10-bit 3-plane 420

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16](#VkFormat) |
| 10-bit 2-plane 420

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16](#VkFormat) |
| 10-bit 3-plane 422

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16](#VkFormat) |
| 10-bit 2-plane 422

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16](#VkFormat) |
| 10-bit 3-plane 444

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16](#VkFormat) |
| 64-bit R12G12B12A12

  Block size 8 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16](#VkFormat),

                    [VK_FORMAT_R12X4G12X4B12X4A12X4_UINT_4PACK16_ARM](#VkFormat) |
| 64-bit G12B12G12R12

  Block size 8 byte

  2x1x1 block extent

  1 texel/block | [VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16](#VkFormat) |
| 64-bit B12G12R12G12

  Block size 8 byte

  2x1x1 block extent

  1 texel/block | [VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16](#VkFormat) |
| 12-bit 3-plane 420

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16](#VkFormat) |
| 12-bit 2-plane 420

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16](#VkFormat) |
| 12-bit 3-plane 422

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16](#VkFormat) |
| 12-bit 2-plane 422

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16](#VkFormat) |
| 12-bit 3-plane 444

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16](#VkFormat) |
| 64-bit G16B16G16R16

  Block size 8 byte

  2x1x1 block extent

  1 texel/block | [VK_FORMAT_G16B16G16R16_422_UNORM](#VkFormat) |
| 64-bit B16G16R16G16

  Block size 8 byte

  2x1x1 block extent

  1 texel/block | [VK_FORMAT_B16G16R16G16_422_UNORM](#VkFormat) |
| 16-bit 3-plane 420

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G16_B16_R16_3PLANE_420_UNORM](#VkFormat) |
| 16-bit 2-plane 420

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G16_B16R16_2PLANE_420_UNORM](#VkFormat) |
| 16-bit 3-plane 422

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G16_B16_R16_3PLANE_422_UNORM](#VkFormat) |
| 16-bit 2-plane 422

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G16_B16R16_2PLANE_422_UNORM](#VkFormat) |
| 16-bit 3-plane 444

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G16_B16_R16_3PLANE_444_UNORM](#VkFormat) |
| PVRTC1_2BPP

  Block size 8 byte

  8x4x1 block extent

  1 texel/block | [VK_FORMAT_PVRTC1_2BPP_UNORM_BLOCK_IMG](#VkFormat),

                    [VK_FORMAT_PVRTC1_2BPP_SRGB_BLOCK_IMG](#VkFormat) |
| PVRTC1_4BPP

  Block size 8 byte

  4x4x1 block extent

  1 texel/block | [VK_FORMAT_PVRTC1_4BPP_UNORM_BLOCK_IMG](#VkFormat),

                    [VK_FORMAT_PVRTC1_4BPP_SRGB_BLOCK_IMG](#VkFormat) |
| PVRTC2_2BPP

  Block size 8 byte

  8x4x1 block extent

  1 texel/block | [VK_FORMAT_PVRTC2_2BPP_UNORM_BLOCK_IMG](#VkFormat),

                    [VK_FORMAT_PVRTC2_2BPP_SRGB_BLOCK_IMG](#VkFormat) |
| PVRTC2_4BPP

  Block size 8 byte

  4x4x1 block extent

  1 texel/block | [VK_FORMAT_PVRTC2_4BPP_UNORM_BLOCK_IMG](#VkFormat),

                    [VK_FORMAT_PVRTC2_4BPP_SRGB_BLOCK_IMG](#VkFormat) |
| ASTC_3x3x3

  Block size 16 byte

  3x3x3 block extent

  27 texel/block | [VK_FORMAT_ASTC_3x3x3_UNORM_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_3x3x3_SRGB_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_3x3x3_SFLOAT_BLOCK_EXT](#VkFormat) |
| ASTC_4x3x3

  Block size 16 byte

  4x3x3 block extent

  36 texel/block | [VK_FORMAT_ASTC_4x3x3_UNORM_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_4x3x3_SRGB_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_4x3x3_SFLOAT_BLOCK_EXT](#VkFormat) |
| ASTC_4x4x3

  Block size 16 byte

  4x4x3 block extent

  48 texel/block | [VK_FORMAT_ASTC_4x4x3_UNORM_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_4x4x3_SRGB_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_4x4x3_SFLOAT_BLOCK_EXT](#VkFormat) |
| ASTC_4x4x4

  Block size 16 byte

  4x4x4 block extent

  64 texel/block | [VK_FORMAT_ASTC_4x4x4_UNORM_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_4x4x4_SRGB_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_4x4x4_SFLOAT_BLOCK_EXT](#VkFormat) |
| ASTC_5x4x4

  Block size 16 byte

  5x4x4 block extent

  80 texel/block | [VK_FORMAT_ASTC_5x4x4_UNORM_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_5x4x4_SRGB_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_5x4x4_SFLOAT_BLOCK_EXT](#VkFormat) |
| ASTC_5x5x4

  Block size 16 byte

  5x5x4 block extent

  100 texel/block | [VK_FORMAT_ASTC_5x5x4_UNORM_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_5x5x4_SRGB_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_5x5x4_SFLOAT_BLOCK_EXT](#VkFormat) |
| ASTC_5x5x5

  Block size 16 byte

  5x5x5 block extent

  125 texel/block | [VK_FORMAT_ASTC_5x5x5_UNORM_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_5x5x5_SRGB_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_5x5x5_SFLOAT_BLOCK_EXT](#VkFormat) |
| ASTC_6x5x5

  Block size 16 byte

  6x5x5 block extent

  150 texel/block | [VK_FORMAT_ASTC_6x5x5_UNORM_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_6x5x5_SRGB_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_6x5x5_SFLOAT_BLOCK_EXT](#VkFormat) |
| ASTC_6x6x5

  Block size 16 byte

  6x6x5 block extent

  180 texel/block | [VK_FORMAT_ASTC_6x6x5_UNORM_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_6x6x5_SRGB_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_6x6x5_SFLOAT_BLOCK_EXT](#VkFormat) |
| ASTC_6x6x6

  Block size 16 byte

  6x6x6 block extent

  216 texel/block | [VK_FORMAT_ASTC_6x6x6_UNORM_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_6x6x6_SRGB_BLOCK_EXT](#VkFormat),

                    [VK_FORMAT_ASTC_6x6x6_SFLOAT_BLOCK_EXT](#VkFormat) |
| 8-bit 2-plane 444

  Block size 3 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](#VkFormat) |
| 10-bit 2-plane 444

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](#VkFormat) |
| 12-bit 2-plane 444

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](#VkFormat) |
| 16-bit 2-plane 444

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](#VkFormat) |
| 64-bit R14G14B14A14

  Block size 8 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_R14X2G14X2B14X2A14X2_UINT_4PACK16_ARM](#VkFormat),

                    [VK_FORMAT_R14X2G14X2B14X2A14X2_UNORM_4PACK16_ARM](#VkFormat) |
| 14-bit 2-plane 420

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G14X2_B14X2R14X2_2PLANE_420_UNORM_3PACK16_ARM](#VkFormat) |
| 14-bit 2-plane 422

  Block size 6 byte

  1x1x1 block extent

  1 texel/block | [VK_FORMAT_G14X2_B14X2R14X2_2PLANE_422_UNORM_3PACK16_ARM](#VkFormat) |

Color formats with the same texel block size are considered
*size-compatible* as long as neither or both are alpha formats (e.g.,
[VK_FORMAT_A8_UNORM](#VkFormat)).
If two size-compatible formats have different block extents (i.e. for
compressed formats), then an image with size A × B × C in
one format with a block extent of a × b × c can be
represented as an image with size X × Y × Z in the other
format with block extent x × y × z at the ratio between
the block extents for each format, where

⌈A/a⌉ = ⌈X/x⌉

⌈B/b⌉ = ⌈Y/y⌉

⌈C/c⌉ = ⌈Z/z⌉

|  | For example, a 7x3 image in the [VK_FORMAT_ASTC_8x5_UNORM_BLOCK](#VkFormat) format
| --- | --- |
can be represented as a 1x1 [VK_FORMAT_R64G64_UINT](#VkFormat) image. |

Images created with the
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) flag can have
size-compatible views created from them to enable access via different
size-compatible formats.
Image views created in this way will be sized to match the expectations of
the block extents noted above.

Copy operations are able to copy between size-compatible formats in
different resources to enable manipulation of data in different formats.
The extent used in these copy operations always matches the source image,
and is resized to the expectations of the block extents noted above for the
destination image.

Copy operations between color formats and a depth-stencil are
size-compatible as defined by [the list of compatible depth-stencil and color formats](#formats-compatible-zs-color).

To query supported format features which are properties of the physical
device, call:

|  | This functionality is superseded by [vkGetPhysicalDeviceFormatProperties2](#vkGetPhysicalDeviceFormatProperties2). See [Legacy Functionality](../appendices/legacy.html#legacy-gpdp2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkGetPhysicalDeviceFormatProperties(
    VkPhysicalDevice                            physicalDevice,
    VkFormat                                    format,
    VkFormatProperties*                         pFormatProperties);

* 
`physicalDevice` is the physical device from which to query the
format properties.

* 
`format` is the format whose properties are queried.

* 
`pFormatProperties` is a pointer to a [VkFormatProperties](#VkFormatProperties)
structure in which physical device properties for `format` are
returned.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceFormatProperties-None-12272) VUID-vkGetPhysicalDeviceFormatProperties-None-12272

    If
Vulkan 1.3 is not supported,
    the [`maintenance5`](features.html#features-maintenance5) feature is not
    supported,
and
    the [`ycbcr2plane444Formats`](features.html#features-ycbcr2plane444Formats)
    feature is not supported, `format` **must** not be
    [VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](#VkFormat),
    [VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](#VkFormat),
    [VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](#VkFormat), or
    [VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](#VkFormat)

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceFormatProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceFormatProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceFormatProperties-format-parameter) VUID-vkGetPhysicalDeviceFormatProperties-format-parameter

 `format` **must** be a valid [VkFormat](#VkFormat) value

* 
[](#VUID-vkGetPhysicalDeviceFormatProperties-pFormatProperties-parameter) VUID-vkGetPhysicalDeviceFormatProperties-pFormatProperties-parameter

 `pFormatProperties` **must** be a valid pointer to a [VkFormatProperties](#VkFormatProperties) structure

The `VkFormatProperties` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkFormatProperties {
    VkFormatFeatureFlags    linearTilingFeatures;
    VkFormatFeatureFlags    optimalTilingFeatures;
    VkFormatFeatureFlags    bufferFeatures;
} VkFormatProperties;

* 
`linearTilingFeatures` is a bitmask of [VkFormatFeatureFlagBits](#VkFormatFeatureFlagBits)
specifying features supported by images created with a `tiling`
parameter of [VK_IMAGE_TILING_LINEAR](resources.html#VkImageTiling).

* 
`optimalTilingFeatures` is a bitmask of
[VkFormatFeatureFlagBits](#VkFormatFeatureFlagBits) specifying features supported by images
created with a `tiling` parameter of [VK_IMAGE_TILING_OPTIMAL](resources.html#VkImageTiling).

* 
`bufferFeatures` is a bitmask of [VkFormatFeatureFlagBits](#VkFormatFeatureFlagBits)
specifying features supported by buffers.

|  | If no format feature flags are supported, the format itself is not
| --- | --- |
supported, and images of that format cannot be created. |

If `format` is block-compressed,
[requires sampler Y′CBCR conversion](#formats-requiring-sampler-ycbcr-conversion),
or is a depth/stencil format then `bufferFeatures` **must** not support any
features for the format.

If `format` is not a multi-plane format then `linearTilingFeatures`
and `optimalTilingFeatures` **must** not contain
[VK_FORMAT_FEATURE_DISJOINT_BIT](#VkFormatFeatureFlagBits).

Bits which **can** be set in the [VkFormatProperties](#VkFormatProperties) features
`linearTilingFeatures`, `optimalTilingFeatures`,
[VkDrmFormatModifierPropertiesEXT](#VkDrmFormatModifierPropertiesEXT)::`drmFormatModifierTilingFeatures`,
and `bufferFeatures` are:

|  | This functionality is superseded by [VkFormatFeatureFlagBits2](#VkFormatFeatureFlagBits2). See [Legacy Functionality](../appendices/legacy.html#legacy-flagbits) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef enum VkFormatFeatureFlagBits {
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT = 0x00000001,
    VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT = 0x00000002,
    VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT = 0x00000004,
    VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT = 0x00000008,
    VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT = 0x00000010,
    VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT = 0x00000020,
    VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT = 0x00000040,
    VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT = 0x00000080,
    VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT = 0x00000100,
    VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT = 0x00000200,
    VK_FORMAT_FEATURE_BLIT_SRC_BIT = 0x00000400,
    VK_FORMAT_FEATURE_BLIT_DST_BIT = 0x00000800,
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT = 0x00001000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_TRANSFER_SRC_BIT = 0x00004000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_TRANSFER_DST_BIT = 0x00008000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT = 0x00020000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT = 0x00040000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT = 0x00080000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT = 0x00100000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT = 0x00200000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_DISJOINT_BIT = 0x00400000,
  // Provided by VK_VERSION_1_1
    VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT = 0x00800000,
  // Provided by VK_VERSION_1_2
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT = 0x00010000,
  // Provided by VK_KHR_video_decode_queue
    VK_FORMAT_FEATURE_VIDEO_DECODE_OUTPUT_BIT_KHR = 0x02000000,
  // Provided by VK_KHR_video_decode_queue
    VK_FORMAT_FEATURE_VIDEO_DECODE_DPB_BIT_KHR = 0x04000000,
  // Provided by VK_KHR_acceleration_structure
    VK_FORMAT_FEATURE_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR = 0x20000000,
  // Provided by VK_EXT_filter_cubic
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT = 0x00002000,
  // Provided by VK_EXT_fragment_density_map
    VK_FORMAT_FEATURE_FRAGMENT_DENSITY_MAP_BIT_EXT = 0x01000000,
  // Provided by VK_KHR_fragment_shading_rate
    VK_FORMAT_FEATURE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR = 0x40000000,
  // Provided by VK_KHR_video_encode_queue
    VK_FORMAT_FEATURE_VIDEO_ENCODE_INPUT_BIT_KHR = 0x08000000,
  // Provided by VK_KHR_video_encode_queue
    VK_FORMAT_FEATURE_VIDEO_ENCODE_DPB_BIT_KHR = 0x10000000,
  // Provided by VK_IMG_filter_cubic
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_IMG = VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT,
  // Provided by VK_KHR_maintenance1
    VK_FORMAT_FEATURE_TRANSFER_SRC_BIT_KHR = VK_FORMAT_FEATURE_TRANSFER_SRC_BIT,
  // Provided by VK_KHR_maintenance1
    VK_FORMAT_FEATURE_TRANSFER_DST_BIT_KHR = VK_FORMAT_FEATURE_TRANSFER_DST_BIT,
  // Provided by VK_EXT_sampler_filter_minmax
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT_EXT = VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT_KHR = VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT_KHR = VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT_KHR = VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT_KHR = VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT_KHR = VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_FEATURE_DISJOINT_BIT_KHR = VK_FORMAT_FEATURE_DISJOINT_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT_KHR = VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT,
} VkFormatFeatureFlagBits;

These values
all have the same meaning as the equivalently named values for
[VkFormatFeatureFlags2](#VkFormatFeatureFlags2) and
**may** be set in
`linearTilingFeatures`, `optimalTilingFeatures`, and
[VkDrmFormatModifierPropertiesEXT](#VkDrmFormatModifierPropertiesEXT)::`drmFormatModifierTilingFeatures`,
specifying that the features are supported by [images](resources.html#VkImage) or
[image views](resources.html#VkImageView)
or [sampler Y′CBCR conversion objects](samplers.html#VkSamplerYcbcrConversion)
created with the queried
[vkGetPhysicalDeviceFormatProperties](#vkGetPhysicalDeviceFormatProperties)::`format`:

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) specifies that an image view
**can** be [sampled from](descriptors.html#descriptors-sampledimage).

* 
[VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits) specifies that an image view
**can** be used as a [storage image](descriptors.html#descriptors-storageimage).

* 
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](#VkFormatFeatureFlagBits) specifies that an image
view **can** be used as storage image that supports atomic operations.

* 
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) specifies that an image
view **can** be used as a framebuffer color attachment and as an input
attachment.

* 
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](#VkFormatFeatureFlagBits) specifies that an
image view **can** be used as a framebuffer color attachment that supports
blending.

* 
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) specifies that an
image view **can** be used as a framebuffer depth/stencil attachment and as
an input attachment.

* 
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits) specifies that an image **can** be
used as `srcImage` for the
`vkCmdBlitImage2` and `vkCmdBlitImage` commands.

* 
[VK_FORMAT_FEATURE_BLIT_DST_BIT](#VkFormatFeatureFlagBits) specifies that an image **can** be
used as `dstImage` for the
`vkCmdBlitImage2` and `vkCmdBlitImage` commands.

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#VkFormatFeatureFlagBits) specifies that
if [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) is also set, an image view
**can** be used with a sampler that has either of `magFilter` or
`minFilter` set to [VK_FILTER_LINEAR](samplers.html#VkFilter), or `mipmapMode` set
to [VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode).
If [VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits) is also set, an image can be
used as the `srcImage` to
`vkCmdBlitImage2` and `vkCmdBlitImage`
with a `filter` of [VK_FILTER_LINEAR](samplers.html#VkFilter).
This bit **must** only be exposed for formats that also support the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) or
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits).

If the format being queried is a depth/stencil format, this bit only
specifies that the depth aspect (not the stencil aspect) of an image of this
format supports linear filtering, and that linear filtering of the depth
aspect is supported whether depth compare is enabled in the sampler or not.
Where depth comparison is supported it **may** be linear filtered whether this
bit is present or not, but where this bit is not present the filtered value
**may** be computed in an implementation-dependent manner which differs from
the normal rules of linear filtering.
The resulting value **must** be in the range [0,1] and **should** be
proportional to, or a weighted average of, the number of comparison passes
or failures.

* 
[VK_FORMAT_FEATURE_TRANSFER_SRC_BIT](#VkFormatFeatureFlagBits) specifies that an image **can** be
used as a source image for [copy commands](copies.html#copies).
If the application `apiVersion` is Vulkan 1.0 and
`[VK_KHR_maintenance1](../appendices/extensions.html#VK_KHR_maintenance1)` is not supported,
[VK_FORMAT_FEATURE_TRANSFER_SRC_BIT](#VkFormatFeatureFlagBits) is implied to be set when the
format feature flag is not 0.

* 
[VK_FORMAT_FEATURE_TRANSFER_DST_BIT](#VkFormatFeatureFlagBits) specifies that an image **can** be
used as a destination image for [copy commands](copies.html#copies) and [    clear commands](clears.html#clears).
If the application `apiVersion` is Vulkan 1.0 and
`[VK_KHR_maintenance1](../appendices/extensions.html#VK_KHR_maintenance1)` is not supported,
[VK_FORMAT_FEATURE_TRANSFER_DST_BIT](#VkFormatFeatureFlagBits) is implied to be set when the
format feature flag is not 0.

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](#VkFormatFeatureFlagBits) specifies
`VkImage` **can** be used as a sampled image with a min or max
[VkSamplerReductionMode](samplers.html#VkSamplerReductionMode).
This bit **must** only be exposed for formats that also support the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits).

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](#VkFormatFeatureFlagBits) specifies
that `VkImage` **can** be used with a sampler that has either of
`magFilter` or `minFilter` set to [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter), or
be the source image for a blit with `filter` set to
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter).
This bit **must** only be exposed for formats that also support the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits).
If the format being queried is a depth/stencil format, this only
specifies that the depth aspect is cubic filterable.

* 
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](#VkFormatFeatureFlagBits) specifies that an
application **can** define a [sampler Y′CBCR    conversion](samplers.html#samplers-YCbCr-conversion) using this format as a source, and that an image of this
format **can** be used with a [VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo)
`xChromaOffset` and/or `yChromaOffset` of
[VK_CHROMA_LOCATION_MIDPOINT](samplers.html#VkChromaLocationKHR).
Otherwise both `xChromaOffset` and `yChromaOffset` **must** be
[VK_CHROMA_LOCATION_COSITED_EVEN](samplers.html#VkChromaLocationKHR).
If a format does not incorporate chroma downsampling (it is not a
“422” or “420” format) but the implementation supports sampler
Y′CBCR conversion for this format, the implementation **must** set
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](#VkFormatFeatureFlagBits).

* 
[VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT](#VkFormatFeatureFlagBits) specifies that an
application **can** define a [sampler Y′CBCR    conversion](samplers.html#samplers-YCbCr-conversion) using this format as a source, and that an image of this
format **can** be used with a [VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo)
`xChromaOffset` and/or `yChromaOffset` of
[VK_CHROMA_LOCATION_COSITED_EVEN](samplers.html#VkChromaLocationKHR).
Otherwise both `xChromaOffset` and `yChromaOffset` **must** be
[VK_CHROMA_LOCATION_MIDPOINT](samplers.html#VkChromaLocationKHR).
If neither [VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT](#VkFormatFeatureFlagBits) nor
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](#VkFormatFeatureFlagBits) is set, the
application **must** not define a [sampler    Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion) using this format as a source.

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT](#VkFormatFeatureFlagBits)
specifies that an application **can** define a
[sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion) using this
format as a source with `chromaFilter` set to
[VK_FILTER_LINEAR](samplers.html#VkFilter).

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT](#VkFormatFeatureFlagBits)
specifies that the format can have different chroma, min, and mag
filters.

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT](#VkFormatFeatureFlagBits)
specifies that reconstruction is explicit, as described in
[Chroma Reconstruction](textures.html#textures-chroma-reconstruction).
If this bit is not present, reconstruction is implicit by default.

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT](#VkFormatFeatureFlagBits)
specifies that reconstruction **can** be forcibly made explicit by setting
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo)::`forceExplicitReconstruction`
to [VK_TRUE](fundamentals.html#VK_TRUE).
If the format being queried supports
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT](#VkFormatFeatureFlagBits)
it **must** also support
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT](#VkFormatFeatureFlagBits).

* 
[VK_FORMAT_FEATURE_DISJOINT_BIT](#VkFormatFeatureFlagBits) specifies that a multi-planar image
**can** have the [VK_IMAGE_CREATE_DISJOINT_BIT](resources.html#VkImageCreateFlagBits) set during image
creation.
An implementation **must** not set [VK_FORMAT_FEATURE_DISJOINT_BIT](#VkFormatFeatureFlagBits) for
*single-plane formats*.

* 
[VK_FORMAT_FEATURE_FRAGMENT_DENSITY_MAP_BIT_EXT](#VkFormatFeatureFlagBits) specifies that an
image view **can** be used as a
[fragment density map    attachment](renderpass.html#renderpass-fragmentdensitymapattachment).

* 
[VK_FORMAT_FEATURE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkFormatFeatureFlagBits)
specifies that an image view **can** be used as a
[fragment shading rate    attachment](primsrast.html#primsrast-fragment-shading-rate-attachment).
An implementation **must** not set this feature for formats with a
[numeric format](#formats-numericformat) other than `UINT`, or set
it as a buffer feature.

* 
[VK_FORMAT_FEATURE_VIDEO_DECODE_OUTPUT_BIT_KHR](#VkFormatFeatureFlagBits) specifies that an
image view with this format **can** be used as a [    decode output picture](videocoding.html#decode-output-picture) in [video decode    operations](videocoding.html#video-decode-operations).

* 
[VK_FORMAT_FEATURE_VIDEO_DECODE_DPB_BIT_KHR](#VkFormatFeatureFlagBits) specifies that an image
view with this format **can** be used as an output [    reconstructed picture](videocoding.html#reconstructed-picture) or an input [reference    picture](videocoding.html#reference-picture) in [video decode operations](videocoding.html#video-decode-operations).

* 
[VK_FORMAT_FEATURE_VIDEO_ENCODE_INPUT_BIT_KHR](#VkFormatFeatureFlagBits) specifies that an
image view with this format **can** be used as an [    encode input picture](videocoding.html#encode-input-picture) in [video encode    operations](videocoding.html#video-encode-operations).

* 
[VK_FORMAT_FEATURE_VIDEO_ENCODE_DPB_BIT_KHR](#VkFormatFeatureFlagBits) specifies that an image
view with this format **can** be used as an output [    reconstructed picture](videocoding.html#reconstructed-picture) or an input [reference    picture](videocoding.html#reference-picture) in [video encode operations](videocoding.html#video-encode-operations).

|  | Specific [video profiles](videocoding.html#video-profiles) **may** have additional restrictions
| --- | --- |
on the format and other image creation parameters corresponding to image
views used by video coding operations that **can** be enumerated using the
[vkGetPhysicalDeviceVideoFormatPropertiesKHR](videocoding.html#vkGetPhysicalDeviceVideoFormatPropertiesKHR) command. |

The following bits **may** be set in `bufferFeatures`, specifying that the
features are supported by [buffers](resources.html#VkBuffer) or [buffer views](resources.html#VkBufferView) created with the queried
[vkGetPhysicalDeviceFormatProperties](#vkGetPhysicalDeviceFormatProperties)::`format`:

* 
[VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) specifies that the
format **can** be used to create a buffer view that **can** be bound to a
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType) descriptor.

* 
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) specifies that the
format **can** be used to create a buffer view that **can** be bound to a
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType) descriptor.

* 
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](#VkFormatFeatureFlagBits) specifies that
atomic operations are supported on
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType) with this format.

* 
[VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](#VkFormatFeatureFlagBits) specifies that the format **can**
be used as a vertex attribute format
(`VkVertexInputAttributeDescription`::`format`).

* 
[VK_FORMAT_FEATURE_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR](#VkFormatFeatureFlagBits)
specifies that the format **can** be used as the vertex format when
creating an [acceleration structure](accelstructures.html#acceleration-structure)
(`VkAccelerationStructureGeometryTrianglesDataKHR`::`vertexFormat`).
This format **can** also be used as the vertex format in host memory when
doing [host acceleration structure](accelstructures.html#host-acceleration-structure)
builds.

|  | [VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](#VkFormatFeatureFlagBits) and
| --- | --- |
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](#VkFormatFeatureFlagBits) are only intended to
be advertised for single-component formats, since SPIR-V atomic operations
require a scalar type. |

|  | This functionality is superseded by [VkFormatFeatureFlags2](#VkFormatFeatureFlags2). See [Legacy Functionality](../appendices/legacy.html#legacy-flagbits) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef VkFlags VkFormatFeatureFlags;

`VkFormatFeatureFlags` is a bitmask type for setting a mask of zero or
more [VkFormatFeatureFlagBits](#VkFormatFeatureFlagBits).

To query supported format features which are properties of the physical
device, call:

// Provided by VK_VERSION_1_1
void vkGetPhysicalDeviceFormatProperties2(
    VkPhysicalDevice                            physicalDevice,
    VkFormat                                    format,
    VkFormatProperties2*                        pFormatProperties);

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to vkGetPhysicalDeviceFormatProperties2
void vkGetPhysicalDeviceFormatProperties2KHR(
    VkPhysicalDevice                            physicalDevice,
    VkFormat                                    format,
    VkFormatProperties2*                        pFormatProperties);

* 
`physicalDevice` is the physical device from which to query the
format properties.

* 
`format` is the format whose properties are queried.

* 
`pFormatProperties` is a pointer to a [VkFormatProperties2](#VkFormatProperties2)
structure in which physical device properties for `format` are
returned.

`vkGetPhysicalDeviceFormatProperties2` behaves similarly to
[vkGetPhysicalDeviceFormatProperties](#vkGetPhysicalDeviceFormatProperties), with the ability to return
extended information in a `pNext` chain of output structures.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceFormatProperties2-None-12273) VUID-vkGetPhysicalDeviceFormatProperties2-None-12273

    If
Vulkan 1.3 is not supported,
    the [`maintenance5`](features.html#features-maintenance5) feature is not
    supported,
and
    the [`ycbcr2plane444Formats`](features.html#features-ycbcr2plane444Formats)
    feature is not supported, `format` **must** not be
    [VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](#VkFormat),
    [VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](#VkFormat),
    [VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](#VkFormat), or
    [VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](#VkFormat)

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceFormatProperties2-physicalDevice-parameter) VUID-vkGetPhysicalDeviceFormatProperties2-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceFormatProperties2-format-parameter) VUID-vkGetPhysicalDeviceFormatProperties2-format-parameter

 `format` **must** be a valid [VkFormat](#VkFormat) value

* 
[](#VUID-vkGetPhysicalDeviceFormatProperties2-pFormatProperties-parameter) VUID-vkGetPhysicalDeviceFormatProperties2-pFormatProperties-parameter

 `pFormatProperties` **must** be a valid pointer to a [VkFormatProperties2](#VkFormatProperties2) structure

The `VkFormatProperties2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkFormatProperties2 {
    VkStructureType       sType;
    void*                 pNext;
    VkFormatProperties    formatProperties;
} VkFormatProperties2;

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to VkFormatProperties2
typedef VkFormatProperties2 VkFormatProperties2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`formatProperties` is a [VkFormatProperties](#VkFormatProperties) structure
describing features supported by the requested format.

Valid Usage (Implicit)

* 
[](#VUID-VkFormatProperties2-sType-sType) VUID-VkFormatProperties2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkFormatProperties2-pNext-pNext) VUID-VkFormatProperties2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDrmFormatModifierPropertiesList2EXT](#VkDrmFormatModifierPropertiesList2EXT), [VkDrmFormatModifierPropertiesListEXT](#VkDrmFormatModifierPropertiesListEXT), [VkFormatProperties3](#VkFormatProperties3), [VkSubpassResolvePerformanceQueryEXT](#VkSubpassResolvePerformanceQueryEXT), or [VkTensorFormatPropertiesARM](#VkTensorFormatPropertiesARM)

* 
[](#VUID-VkFormatProperties2-sType-unique) VUID-VkFormatProperties2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

To obtain the list of [Linux DRM format modifiers](../appendices/glossary.html#glossary-drm-format-modifier) compatible with a [VkFormat](#VkFormat), add a
[VkDrmFormatModifierPropertiesListEXT](#VkDrmFormatModifierPropertiesListEXT) structure to the `pNext`
chain of [VkFormatProperties2](#VkFormatProperties2).

The [VkDrmFormatModifierPropertiesListEXT](#VkDrmFormatModifierPropertiesListEXT) structure is defined as:

// Provided by VK_EXT_image_drm_format_modifier
typedef struct VkDrmFormatModifierPropertiesListEXT {
    VkStructureType                      sType;
    void*                                pNext;
    uint32_t                             drmFormatModifierCount;
    VkDrmFormatModifierPropertiesEXT*    pDrmFormatModifierProperties;
} VkDrmFormatModifierPropertiesListEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`drmFormatModifierCount` is an inout parameter related to the number
of modifiers compatible with the `format`, as described below.

* 
`pDrmFormatModifierProperties` is either `NULL` or a pointer to an
array of [VkDrmFormatModifierPropertiesEXT](#VkDrmFormatModifierPropertiesEXT) structures.

If `pDrmFormatModifierProperties` is `NULL`, then the function returns
in `drmFormatModifierCount` the number of modifiers compatible with the
queried `format`.
Otherwise, the application **must** set `drmFormatModifierCount` to the
length of the array `pDrmFormatModifierProperties`; the function will
write at most `drmFormatModifierCount` elements to the array, and will
return in `drmFormatModifierCount` the number of elements written.

Among the elements in array `pDrmFormatModifierProperties`, each
returned `drmFormatModifier` **must** be unique.

Valid Usage (Implicit)

* 
[](#VUID-VkDrmFormatModifierPropertiesListEXT-sType-sType) VUID-VkDrmFormatModifierPropertiesListEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DRM_FORMAT_MODIFIER_PROPERTIES_LIST_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFormatProperties2](#VkFormatProperties2)

The [VkDrmFormatModifierPropertiesEXT](#VkDrmFormatModifierPropertiesEXT) structure describes properties of
a [VkFormat](#VkFormat) when that format is combined with a
[Linux DRM format modifier](../appendices/glossary.html#glossary-drm-format-modifier).
These properties, like those of [VkFormatProperties2](#VkFormatProperties2), are independent
of any particular image.

The [VkDrmFormatModifierPropertiesEXT](#VkDrmFormatModifierPropertiesEXT) structure is defined as:

// Provided by VK_EXT_image_drm_format_modifier
typedef struct VkDrmFormatModifierPropertiesEXT {
    uint64_t                drmFormatModifier;
    uint32_t                drmFormatModifierPlaneCount;
    VkFormatFeatureFlags    drmFormatModifierTilingFeatures;
} VkDrmFormatModifierPropertiesEXT;

* 
`drmFormatModifier` is a *Linux DRM format modifier*.

* 
`drmFormatModifierPlaneCount` is the number of *memory planes* in
any image created with `format` and `drmFormatModifier`.
An image’s *memory planecount* is distinct from its *format planecount*,
as explained below.

* 
`drmFormatModifierTilingFeatures` is a bitmask of
[VkFormatFeatureFlagBits](#VkFormatFeatureFlagBits) that are supported by any image created
with `format` and `drmFormatModifier`.

The returned `drmFormatModifierTilingFeatures` **must** contain at least
one bit.

The implementation **must** not return `DRM_FORMAT_MOD_INVALID` in
`drmFormatModifier`.

An image’s *memory planecount* (as returned by
`drmFormatModifierPlaneCount`) is distinct from its *format planecount*
(in the sense of [multi-planar format](#formats-multiplanar)).
In [VkImageAspectFlags](resources.html#VkImageAspectFlags), each
`VK_IMAGE_ASPECT_MEMORY_PLANE*_i_*BIT_EXT` represents a *memory plane*
and each `VK_IMAGE_ASPECT_PLANE*_i_*BIT` a *format plane*.

An image’s set of *format planes* is an ordered partition of the image’s
**content** into separable groups of format components.
The ordered partition is encoded in the name of each [VkFormat](#VkFormat).
For example, [VK_FORMAT_G8_B8R8_2PLANE_420_UNORM](#VkFormat) contains two *format
planes*; the first plane contains the green component and the second plane
contains the blue component and red component.
If the format name does not contain `PLANE`, then the format contains a
single plane; for example, [VK_FORMAT_R8G8B8A8_UNORM](#VkFormat).
Some commands, such as [vkCmdCopyBufferToImage](copies.html#vkCmdCopyBufferToImage), do not operate on all
format components in the image, but instead operate only on the *format
planes* explicitly chosen by the application and operate on each *format
plane* independently.

An image’s set of *memory planes* is an ordered partition of the image’s
**memory** rather than the image’s **content**.
Each *memory plane* is a contiguous range of memory.
The union of an image’s *memory planes* is not necessarily contiguous.

If an image is [linear](../appendices/glossary.html#glossary-linear-resource), then the partition is
the same for *memory planes* and for *format planes*.
Therefore, if the returned `drmFormatModifier` is
`DRM_FORMAT_MOD_LINEAR`, then `drmFormatModifierPlaneCount` **must**
equal the *format planecount*, and `drmFormatModifierTilingFeatures`
**must** be identical to the
[VkFormatProperties2](#VkFormatProperties2)::`formatProperties.linearTilingFeatures`
returned in the same `pNext` chain.

If an image is [non-linear](../appendices/glossary.html#glossary-linear-resource), then the partition
of the image’s **memory** into *memory planes* is implementation-specific and
**may** be unrelated to the partition of the image’s **content** into *format
planes*.
For example, consider an image whose `format` is
[VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM](#VkFormat), `tiling` is
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](resources.html#VkImageTiling), whose `drmFormatModifier`
is not `DRM_FORMAT_MOD_LINEAR`, and `flags` lacks
[VK_IMAGE_CREATE_DISJOINT_BIT](resources.html#VkImageCreateFlagBits).
The image has 3 *format planes*, and commands such
[vkCmdCopyBufferToImage](copies.html#vkCmdCopyBufferToImage) act on each *format plane* independently as if
the data of each *format plane* were separable from the data of the other
planes.
In a straightforward implementation, the implementation **may** store the
image’s content in 3 adjacent *memory planes* where each *memory plane*
corresponds exactly to a *format plane*.
However, the implementation **may** also store the image’s content in a single
*memory plane* where all format components are combined using an
implementation-private block-compressed format; or the implementation **may**
store the image’s content in a collection of 7 adjacent *memory planes*
using an implementation-private sharding technique.
Because the image is non-linear and non-disjoint, the implementation has
much freedom when choosing the image’s placement in memory.

The *memory planecount* applies to function parameters and structures only
when the API specifies an explicit requirement on
`drmFormatModifierPlaneCount`.
In all other cases, the *memory planecount* is ignored.

The list of [Linux DRM format modifiers](../appendices/glossary.html#glossary-drm-format-modifier)
compatible with a [VkFormat](#VkFormat) **can** be obtained by adding a
[VkDrmFormatModifierPropertiesList2EXT](#VkDrmFormatModifierPropertiesList2EXT) structure to the `pNext`
chain of [VkFormatProperties2](#VkFormatProperties2).

The [VkDrmFormatModifierPropertiesList2EXT](#VkDrmFormatModifierPropertiesList2EXT) structure is defined as:

// Provided by VK_EXT_image_drm_format_modifier with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
typedef struct VkDrmFormatModifierPropertiesList2EXT {
    VkStructureType                       sType;
    void*                                 pNext;
    uint32_t                              drmFormatModifierCount;
    VkDrmFormatModifierProperties2EXT*    pDrmFormatModifierProperties;
} VkDrmFormatModifierPropertiesList2EXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`drmFormatModifierCount` is an inout parameter related to the number
of modifiers compatible with the `format`, as described below.

* 
`pDrmFormatModifierProperties` is either `NULL` or a pointer to an
array of [VkDrmFormatModifierProperties2EXT](#VkDrmFormatModifierProperties2EXT) structures.

If `pDrmFormatModifierProperties` is `NULL`, the number of modifiers
compatible with the queried `format` is returned in
`drmFormatModifierCount`.
Otherwise, the application **must** set `drmFormatModifierCount` to the
length of the array `pDrmFormatModifierProperties`; the function will
write at most `drmFormatModifierCount` elements to the array, and will
return in `drmFormatModifierCount` the number of elements written.

Among the elements in array `pDrmFormatModifierProperties`, each
returned `drmFormatModifier` **must** be unique.

Among the elements in array `pDrmFormatModifierProperties`, the bits
reported in `drmFormatModifierTilingFeatures` **must** include the bits
reported in the corresponding element of
`VkDrmFormatModifierPropertiesListEXT`::`pDrmFormatModifierProperties`.

Valid Usage (Implicit)

* 
[](#VUID-VkDrmFormatModifierPropertiesList2EXT-sType-sType) VUID-VkDrmFormatModifierPropertiesList2EXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DRM_FORMAT_MODIFIER_PROPERTIES_LIST_2_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFormatProperties2](#VkFormatProperties2)

The [VkDrmFormatModifierProperties2EXT](#VkDrmFormatModifierProperties2EXT) structure describes properties
of a [VkFormat](#VkFormat) when that format is combined with a
[Linux DRM format modifier](../appendices/glossary.html#glossary-drm-format-modifier).
These properties, like those of [VkFormatProperties2](#VkFormatProperties2), are independent
of any particular image.

The [VkDrmFormatModifierPropertiesEXT](#VkDrmFormatModifierPropertiesEXT) structure is defined as:

// Provided by VK_EXT_image_drm_format_modifier with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
typedef struct VkDrmFormatModifierProperties2EXT {
    uint64_t                 drmFormatModifier;
    uint32_t                 drmFormatModifierPlaneCount;
    VkFormatFeatureFlags2    drmFormatModifierTilingFeatures;
} VkDrmFormatModifierProperties2EXT;

* 
`drmFormatModifier` is a *Linux DRM format modifier*.

* 
`drmFormatModifierPlaneCount` is the number of *memory planes* in
any image created with `format` and `drmFormatModifier`.
An image’s *memory planecount* is distinct from its *format planecount*,
as explained below.

* 
`drmFormatModifierTilingFeatures` is a bitmask of
[VkFormatFeatureFlagBits2](#VkFormatFeatureFlagBits2) that are supported by any image created
with `format` and `drmFormatModifier`.

To query supported format extended features which are properties of the
physical device, add [VkFormatProperties3](#VkFormatProperties3) structure to the `pNext`
chain of [VkFormatProperties2](#VkFormatProperties2).

The [VkFormatProperties3](#VkFormatProperties3) structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkFormatProperties3 {
    VkStructureType          sType;
    void*                    pNext;
    VkFormatFeatureFlags2    linearTilingFeatures;
    VkFormatFeatureFlags2    optimalTilingFeatures;
    VkFormatFeatureFlags2    bufferFeatures;
} VkFormatProperties3;

// Provided by VK_KHR_format_feature_flags2
// Equivalent to VkFormatProperties3
typedef VkFormatProperties3 VkFormatProperties3KHR;

* 
`linearTilingFeatures` is a bitmask of
[VkFormatFeatureFlagBits2](#VkFormatFeatureFlagBits2) specifying features supported by images
created with a `tiling` parameter of [VK_IMAGE_TILING_LINEAR](resources.html#VkImageTiling).

* 
`optimalTilingFeatures` is a bitmask of
[VkFormatFeatureFlagBits2](#VkFormatFeatureFlagBits2) specifying features supported by images
created with a `tiling` parameter of [VK_IMAGE_TILING_OPTIMAL](resources.html#VkImageTiling).

* 
`bufferFeatures` is a bitmask of [VkFormatFeatureFlagBits2](#VkFormatFeatureFlagBits2)
specifying features supported by buffers.

The bits reported in `linearTilingFeatures`, `optimalTilingFeatures`
and `bufferFeatures` **must** include the bits reported in the
corresponding fields of `VkFormatProperties2`::`formatProperties`.

Valid Usage (Implicit)

* 
[](#VUID-VkFormatProperties3-sType-sType) VUID-VkFormatProperties3-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_3](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFormatProperties2](#VkFormatProperties2)

Bits which **can** be set in the [VkFormatProperties3](#VkFormatProperties3) features
`linearTilingFeatures`, `optimalTilingFeatures`, and
`bufferFeatures` are:

// Provided by VK_VERSION_1_3
// Flag bits for VkFormatFeatureFlagBits2
typedef VkFlags64 VkFormatFeatureFlagBits2;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_BIT = 0x00000001ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_STORAGE_IMAGE_BIT = 0x00000002ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_STORAGE_IMAGE_ATOMIC_BIT = 0x00000004ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_UNIFORM_TEXEL_BUFFER_BIT = 0x00000008ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_STORAGE_TEXEL_BUFFER_BIT = 0x00000010ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_STORAGE_TEXEL_BUFFER_ATOMIC_BIT = 0x00000020ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_VERTEX_BUFFER_BIT = 0x00000040ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_COLOR_ATTACHMENT_BIT = 0x00000080ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_COLOR_ATTACHMENT_BLEND_BIT = 0x00000100ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_DEPTH_STENCIL_ATTACHMENT_BIT = 0x00000200ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_BLIT_SRC_BIT = 0x00000400ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_BLIT_DST_BIT = 0x00000800ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_FILTER_LINEAR_BIT = 0x00001000ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_TRANSFER_SRC_BIT = 0x00004000ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_TRANSFER_DST_BIT = 0x00008000ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_FILTER_MINMAX_BIT = 0x00010000ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_MIDPOINT_CHROMA_SAMPLES_BIT = 0x00020000ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT = 0x00040000ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT = 0x00080000ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT = 0x00100000ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT = 0x00200000ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_DISJOINT_BIT = 0x00400000ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_COSITED_CHROMA_SAMPLES_BIT = 0x00800000ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT = 0x80000000ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT = 0x100000000ULL;
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT = 0x200000000ULL;
// Provided by VK_VERSION_1_3
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_FILTER_CUBIC_BIT = 0x00002000ULL;
// Provided by VK_VERSION_1_4
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_HOST_IMAGE_TRANSFER_BIT = 0x400000000000ULL;
// Provided by VK_KHR_video_decode_queue with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_VIDEO_DECODE_OUTPUT_BIT_KHR = 0x02000000ULL;
// Provided by VK_KHR_video_decode_queue with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_VIDEO_DECODE_DPB_BIT_KHR = 0x04000000ULL;
// Provided by VK_KHR_acceleration_structure with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR = 0x20000000ULL;
// Provided by VK_EXT_fragment_density_map with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_FRAGMENT_DENSITY_MAP_BIT_EXT = 0x01000000ULL;
// Provided by VK_KHR_fragment_shading_rate with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR = 0x40000000ULL;
// Provided by VK_EXT_host_image_copy
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_HOST_IMAGE_TRANSFER_BIT_EXT = 0x400000000000ULL;
// Provided by VK_KHR_video_encode_queue with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_VIDEO_ENCODE_INPUT_BIT_KHR = 0x08000000ULL;
// Provided by VK_KHR_video_encode_queue with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_VIDEO_ENCODE_DPB_BIT_KHR = 0x10000000ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_BIT_KHR = 0x00000001ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_STORAGE_IMAGE_BIT_KHR = 0x00000002ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_STORAGE_IMAGE_ATOMIC_BIT_KHR = 0x00000004ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_UNIFORM_TEXEL_BUFFER_BIT_KHR = 0x00000008ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_STORAGE_TEXEL_BUFFER_BIT_KHR = 0x00000010ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_STORAGE_TEXEL_BUFFER_ATOMIC_BIT_KHR = 0x00000020ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_VERTEX_BUFFER_BIT_KHR = 0x00000040ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_COLOR_ATTACHMENT_BIT_KHR = 0x00000080ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_COLOR_ATTACHMENT_BLEND_BIT_KHR = 0x00000100ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_DEPTH_STENCIL_ATTACHMENT_BIT_KHR = 0x00000200ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_BLIT_SRC_BIT_KHR = 0x00000400ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_BLIT_DST_BIT_KHR = 0x00000800ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_FILTER_LINEAR_BIT_KHR = 0x00001000ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_TRANSFER_SRC_BIT_KHR = 0x00004000ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_TRANSFER_DST_BIT_KHR = 0x00008000ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_MIDPOINT_CHROMA_SAMPLES_BIT_KHR = 0x00020000ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT_KHR = 0x00040000ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT_KHR = 0x00080000ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT_KHR = 0x00100000ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT_KHR = 0x00200000ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_DISJOINT_BIT_KHR = 0x00400000ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_COSITED_CHROMA_SAMPLES_BIT_KHR = 0x00800000ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT_KHR = 0x80000000ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT_KHR = 0x100000000ULL;
// Provided by VK_KHR_format_feature_flags2
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT_KHR = 0x200000000ULL;
// Provided by VK_KHR_format_feature_flags2 with VK_VERSION_1_2 or VK_EXT_sampler_filter_minmax
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_FILTER_MINMAX_BIT_KHR = 0x00010000ULL;
// Provided by VK_KHR_format_feature_flags2 with VK_EXT_filter_cubic or VK_IMG_filter_cubic
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT = 0x00002000ULL;
// Provided by VK_NV_ray_tracing_linear_swept_spheres
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_ACCELERATION_STRUCTURE_RADIUS_BUFFER_BIT_NV = 0x8000000000000ULL;
// Provided by VK_NV_linear_color_attachment with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV = 0x4000000000ULL;
// Provided by VK_QCOM_image_processing with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM = 0x400000000ULL;
// Provided by VK_QCOM_image_processing with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM = 0x800000000ULL;
// Provided by VK_QCOM_image_processing with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM = 0x1000000000ULL;
// Provided by VK_QCOM_image_processing with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM = 0x2000000000ULL;
// Provided by VK_ARM_tensors
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_TENSOR_SHADER_BIT_ARM = 0x8000000000ULL;
// Provided by VK_ARM_tensors
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_TENSOR_IMAGE_ALIASING_BIT_ARM = 0x80000000000ULL;
// Provided by VK_NV_optical_flow
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_OPTICAL_FLOW_IMAGE_BIT_NV = 0x10000000000ULL;
// Provided by VK_NV_optical_flow
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_OPTICAL_FLOW_VECTOR_BIT_NV = 0x20000000000ULL;
// Provided by VK_NV_optical_flow
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_OPTICAL_FLOW_COST_BIT_NV = 0x40000000000ULL;
// Provided by VK_ARM_data_graph
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_TENSOR_DATA_GRAPH_BIT_ARM = 0x1000000000000ULL;
// Provided by VK_KHR_copy_memory_indirect
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_COPY_IMAGE_INDIRECT_DST_BIT_KHR = 0x800000000000000ULL;
// Provided by VK_KHR_video_encode_quantization_map
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR = 0x2000000000000ULL;
// Provided by VK_KHR_video_encode_quantization_map
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR = 0x4000000000000ULL;
// Provided by VK_KHR_maintenance10 with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_COMPUTE_QUEUE_BIT_KHR = 0x10000000000000ULL;
// Provided by VK_KHR_maintenance10 with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_TRANSFER_QUEUE_BIT_KHR = 0x20000000000000ULL;
// Provided by VK_KHR_maintenance10 with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_COMPUTE_QUEUE_BIT_KHR = 0x40000000000000ULL;
// Provided by VK_KHR_maintenance10 with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_TRANSFER_QUEUE_BIT_KHR = 0x80000000000000ULL;
// Provided by VK_ARM_data_graph_optical_flow
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_DATA_GRAPH_OPTICAL_FLOW_IMAGE_BIT_ARM = 0x100000000000000ULL;
// Provided by VK_ARM_data_graph_optical_flow
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_DATA_GRAPH_OPTICAL_FLOW_VECTOR_BIT_ARM = 0x200000000000000ULL;
// Provided by VK_ARM_data_graph_optical_flow
static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_DATA_GRAPH_OPTICAL_FLOW_COST_BIT_ARM = 0x400000000000000ULL;

// Provided by VK_KHR_format_feature_flags2
// Equivalent to VkFormatFeatureFlagBits2
typedef VkFormatFeatureFlagBits2 VkFormatFeatureFlagBits2KHR;

The following bits **may** be set in `linearTilingFeatures` and
`optimalTilingFeatures`, specifying that the features are supported by
[images](resources.html#VkImage) or [image views](resources.html#VkImageView)
or [sampler Y′CBCR conversion objects](samplers.html#VkSamplerYcbcrConversion)
created with the queried
[vkGetPhysicalDeviceFormatProperties2](#vkGetPhysicalDeviceFormatProperties2)::`format`:

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits2KHR) specifies that an image view
**can** be [sampled from](descriptors.html#descriptors-sampledimage).

* 
[VK_FORMAT_FEATURE_2_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits2KHR) specifies that an image view
**can** be used as a [storage image](descriptors.html#descriptors-storageimage).

* 
[VK_FORMAT_FEATURE_2_STORAGE_IMAGE_ATOMIC_BIT](#VkFormatFeatureFlagBits2KHR) specifies that an
image view **can** be used as storage image that supports atomic
operations.

* 
[VK_FORMAT_FEATURE_2_COLOR_ATTACHMENT_BIT](#VkFormatFeatureFlagBits2KHR) specifies that an image
view **can** be used as a framebuffer color attachment and as an input
attachment.

* 
[VK_FORMAT_FEATURE_2_COLOR_ATTACHMENT_BLEND_BIT](#VkFormatFeatureFlagBits2KHR) specifies that an
image view **can** be used as a framebuffer color attachment that supports
blending.

* 
[VK_FORMAT_FEATURE_2_DEPTH_STENCIL_ATTACHMENT_BIT](#VkFormatFeatureFlagBits2KHR) specifies that an
image view **can** be used as a framebuffer depth/stencil attachment and as
an input attachment.

* 
[VK_FORMAT_FEATURE_2_BLIT_SRC_BIT](#VkFormatFeatureFlagBits2KHR) specifies that an image **can** be
    used as the `srcImage` for
[vkCmdBlitImage2](copies.html#vkCmdBlitImage2) and
    [vkCmdBlitImage](copies.html#vkCmdBlitImage).

* 
[VK_FORMAT_FEATURE_2_BLIT_DST_BIT](#VkFormatFeatureFlagBits2KHR) specifies that an image **can** be
    used as the `dstImage` for
[vkCmdBlitImage2](copies.html#vkCmdBlitImage2) and
    [vkCmdBlitImage](copies.html#vkCmdBlitImage).

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#VkFormatFeatureFlagBits2KHR) specifies that
    if [VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits2KHR) is also set, an image
    view **can** be used with a sampler that has either of `magFilter` or
    `minFilter` set to [VK_FILTER_LINEAR](samplers.html#VkFilter), or `mipmapMode` set
    to [VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode).
    If [VK_FORMAT_FEATURE_2_BLIT_SRC_BIT](#VkFormatFeatureFlagBits2KHR) is also set, an image can be
    used as the `srcImage` for
[vkCmdBlitImage2](copies.html#vkCmdBlitImage2) and
    `vkCmdBlitImage` with a `filter` of [VK_FILTER_LINEAR](samplers.html#VkFilter).
    This bit **must** only be exposed for formats that also support the
    [VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits2KHR) or
    [VK_FORMAT_FEATURE_2_BLIT_SRC_BIT](#VkFormatFeatureFlagBits2KHR).

If the format being queried is a depth/stencil format, this bit only
specifies that the depth aspect (not the stencil aspect) of an image of this
format supports linear filtering.
Where depth comparison is supported it **may** be linear filtered whether this
bit is present or not, but where this bit is not present the filtered value
**may** be computed in an implementation-dependent manner which differs from
the normal rules of linear filtering.
The resulting value **must** be in the range [0,1] and **should** be
proportional to, or a weighted average of, the number of comparison passes
or failures.

* 
[VK_FORMAT_FEATURE_2_TRANSFER_SRC_BIT](#VkFormatFeatureFlagBits2KHR) specifies that an image **can**
be used as a source image for [copy commands](copies.html#copies).

* 
[VK_FORMAT_FEATURE_2_TRANSFER_DST_BIT](#VkFormatFeatureFlagBits2KHR) specifies that an image **can**
be used as a destination image for [copy commands](copies.html#copies) and
[clear commands](clears.html#clears).

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_FILTER_MINMAX_BIT](#VkFormatFeatureFlagBits2KHR) specifies
`VkImage` **can** be used as a sampled image with a min or max
[VkSamplerReductionMode](samplers.html#VkSamplerReductionMode).
This bit **must** only be exposed for formats that also support the
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits2KHR).

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_FILTER_CUBIC_BIT](#VkFormatFeatureFlagBits2KHR) specifies that
`VkImage` **can** be used with a sampler that has either of
`magFilter` or `minFilter` set to [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter), or
be the source image for a blit with `filter` set to
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter).
This bit **must** only be exposed for formats that also support the
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits2KHR).
If the format being queried is a depth/stencil format, this only
specifies that the depth aspect is cubic filterable.

* 
[VK_FORMAT_FEATURE_2_MIDPOINT_CHROMA_SAMPLES_BIT](#VkFormatFeatureFlagBits2KHR) specifies that an
application **can** define a [sampler Y′CBCR    conversion](samplers.html#samplers-YCbCr-conversion) using this format as a source, and that an image of this
format **can** be used with a [VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo)
`xChromaOffset` and/or `yChromaOffset` of
[VK_CHROMA_LOCATION_MIDPOINT](samplers.html#VkChromaLocationKHR).
Otherwise both `xChromaOffset` and `yChromaOffset` **must** be
[VK_CHROMA_LOCATION_COSITED_EVEN](samplers.html#VkChromaLocationKHR).
If a format does not incorporate chroma downsampling (it is not a
“422” or “420” format) but the implementation supports sampler
Y′CBCR conversion for this format, the implementation **must** set
[VK_FORMAT_FEATURE_2_MIDPOINT_CHROMA_SAMPLES_BIT](#VkFormatFeatureFlagBits2KHR).

* 
[VK_FORMAT_FEATURE_2_COSITED_CHROMA_SAMPLES_BIT](#VkFormatFeatureFlagBits2KHR) specifies that an
application **can** define a [sampler Y′CBCR    conversion](samplers.html#samplers-YCbCr-conversion) using this format as a source, and that an image of this
format **can** be used with a [VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo)
`xChromaOffset` and/or `yChromaOffset` of
[VK_CHROMA_LOCATION_COSITED_EVEN](samplers.html#VkChromaLocationKHR).
Otherwise both `xChromaOffset` and `yChromaOffset` **must** be
[VK_CHROMA_LOCATION_MIDPOINT](samplers.html#VkChromaLocationKHR).
If neither [VK_FORMAT_FEATURE_2_COSITED_CHROMA_SAMPLES_BIT](#VkFormatFeatureFlagBits2KHR) nor
[VK_FORMAT_FEATURE_2_MIDPOINT_CHROMA_SAMPLES_BIT](#VkFormatFeatureFlagBits2KHR) is set, the
application **must** not define a [sampler    Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion) using this format as a source.

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT](#VkFormatFeatureFlagBits2KHR)
specifies that an application **can** define a
[sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion) using this
format as a source with `chromaFilter` set to
[VK_FILTER_LINEAR](samplers.html#VkFilter).

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT](#VkFormatFeatureFlagBits2KHR)
specifies that the format can have different chroma, min, and mag
filters.

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT](#VkFormatFeatureFlagBits2KHR)
specifies that reconstruction is explicit, as described in
[Chroma Reconstruction](textures.html#textures-chroma-reconstruction).
If this bit is not present, reconstruction is implicit by default.

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT](#VkFormatFeatureFlagBits2KHR)
specifies that reconstruction **can** be forcibly made explicit by setting
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo)::`forceExplicitReconstruction`
to [VK_TRUE](fundamentals.html#VK_TRUE).
If the format being queried supports
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT](#VkFormatFeatureFlagBits2KHR)
it **must** also support
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT](#VkFormatFeatureFlagBits2KHR).

* 
[VK_FORMAT_FEATURE_2_DISJOINT_BIT](#VkFormatFeatureFlagBits2KHR) specifies that a multi-planar
image **can** have the [VK_IMAGE_CREATE_DISJOINT_BIT](resources.html#VkImageCreateFlagBits) set during image
creation.
An implementation **must** not set [VK_FORMAT_FEATURE_2_DISJOINT_BIT](#VkFormatFeatureFlagBits2KHR)
for *single-plane formats*.

* 
[VK_FORMAT_FEATURE_2_FRAGMENT_DENSITY_MAP_BIT_EXT](#VkFormatFeatureFlagBits2KHR) specifies that an
image view **can** be used as a
[fragment density map    attachment](renderpass.html#renderpass-fragmentdensitymapattachment).

* 
[VK_FORMAT_FEATURE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkFormatFeatureFlagBits2KHR)
specifies that an image view **can** be used as a
[fragment shading rate    attachment](primsrast.html#primsrast-fragment-shading-rate-attachment).
An implementation **must** not set this feature for formats with a
[numeric format](#formats-numericformat) other than `UINT`, or set
it as a buffer feature.

* 
[VK_FORMAT_FEATURE_2_VIDEO_DECODE_OUTPUT_BIT_KHR](#VkFormatFeatureFlagBits2KHR) specifies that an
image view with this format **can** be used as a [    decode output picture](videocoding.html#decode-output-picture) in [video decode    operations](videocoding.html#video-decode-operations).

* 
[VK_FORMAT_FEATURE_2_VIDEO_DECODE_DPB_BIT_KHR](#VkFormatFeatureFlagBits2KHR) specifies that an
image view with this format **can** be used as an output
[reconstructed picture](videocoding.html#reconstructed-picture) or an input
[reference picture](videocoding.html#reference-picture) in
[video decode operations](videocoding.html#video-decode-operations).

* 
[VK_FORMAT_FEATURE_2_VIDEO_ENCODE_INPUT_BIT_KHR](#VkFormatFeatureFlagBits2KHR) specifies that an
image view with this format **can** be used as an [    encode input picture](videocoding.html#encode-input-picture) in [video encode    operations](videocoding.html#video-encode-operations).

* 
[VK_FORMAT_FEATURE_2_VIDEO_ENCODE_DPB_BIT_KHR](#VkFormatFeatureFlagBits2KHR) specifies that an
image view with this format **can** be used as an output
[reconstructed picture](videocoding.html#reconstructed-picture) or an input
[reference picture](videocoding.html#reference-picture) in
[video encode operations](videocoding.html#video-encode-operations).

* 
[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_COMPUTE_QUEUE_BIT_KHR](#VkFormatFeatureFlagBits2KHR) specifies
that the depth aspect of this format can be copied using a queue family
that supports [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) but does not support
[VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits).

* 
[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_TRANSFER_QUEUE_BIT_KHR](#VkFormatFeatureFlagBits2KHR) specifies
that the depth aspect of this format can be copied using a queue family
that supports [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) but does not support
[VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits).

* 
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_COMPUTE_QUEUE_BIT_KHR](#VkFormatFeatureFlagBits2KHR)
specifies that the stencil aspect of this format can be copied using a
queue family that supports [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) but does not
support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits).

* 
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_TRANSFER_QUEUE_BIT_KHR](#VkFormatFeatureFlagBits2KHR)
specifies that the stencil aspect of this format can be copied using a
queue family that supports [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) but does not
support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits).

|  | Specific [video profiles](videocoding.html#video-profiles) **may** have additional restrictions
| --- | --- |
on the format and other image creation parameters corresponding to image
views used by video coding operations that **can** be enumerated using the
[vkGetPhysicalDeviceVideoFormatPropertiesKHR](videocoding.html#vkGetPhysicalDeviceVideoFormatPropertiesKHR) command. |

* 
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](#VkFormatFeatureFlagBits2KHR) specifies that
image views or buffer views created with this format **can** be used as
[storage images](descriptors.html#descriptors-storageimage) or
[storage texel buffers](descriptors.html#descriptors-storagetexelbuffer) respectively
for read operations without specifying a format.

* 
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](#VkFormatFeatureFlagBits2KHR) specifies
that image views or buffer views created with this format **can** be used
as [storage images](descriptors.html#descriptors-storageimage) or
[storage texel buffers](descriptors.html#descriptors-storagetexelbuffer) respectively
for write operations without specifying a format.

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](#VkFormatFeatureFlagBits2KHR) specifies
that image views created with this format **can** be used for depth
comparison performed by `OpImage*Dref*` instructions.

* 
[VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](#VkFormatFeatureFlagBits2KHR) specifies that
the format is supported as a renderable
[Linear Color Attachment](../appendices/glossary.html#glossary-linear-color-attachment).
This bit will be set for renderable color formats in the
`linearTilingFeatures`.
This **must** not be set in the `optimalTilingFeatures` or
`bufferFeatures` members.

* 
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](#VkFormatFeatureFlagBits2KHR) specifies that image
views created with this format **can** be used as the
[weight image](descriptors.html#descriptors-weightimage) input to
[weight image sampling](textures.html#textures-weightimage) operations.

* 
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](#VkFormatFeatureFlagBits2KHR) specifies that
image views created with this format **can** be sampled in
[weight image sampling](textures.html#textures-weightimage) operations.

* 
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](#VkFormatFeatureFlagBits2KHR) specifies that image
views created with this format **can** be used in
[block matching](textures.html#textures-blockmatch) operations.

* 
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](#VkFormatFeatureFlagBits2KHR) specifies that
image views created with this format **can** be sampled in
[box filter sampling](textures.html#textures-boxfilter) operations.

* 
[VK_FORMAT_FEATURE_2_HOST_IMAGE_TRANSFER_BIT](#VkFormatFeatureFlagBits2KHR) specifies that an
image **can** be created with the [VK_IMAGE_USAGE_HOST_TRANSFER_BIT](resources.html#VkImageUsageFlagBits)
usage flag set.

* 
[VK_FORMAT_FEATURE_2_COPY_IMAGE_INDIRECT_DST_BIT_KHR](#VkFormatFeatureFlagBits2KHR) specifies that
a [VkImage](resources.html#VkImage) **can** be used as destination for [    indirect copies](copies.html#indirect-copies).

* 
[VK_FORMAT_FEATURE_2_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](#VkFormatFeatureFlagBits2KHR)
specifies that an image view with this format **can** be used as a
[quantization delta map](videocoding.html#encode-quantization-delta-map) in
[video encode operations](videocoding.html#video-encode-operations).

* 
[VK_FORMAT_FEATURE_2_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](#VkFormatFeatureFlagBits2KHR) specifies
that an image view with this format **can** be used as an
[emphasis map](videocoding.html#encode-emphasis-map) in [video    encode operations](videocoding.html#video-encode-operations).

|  | [Video encode quantization maps](videocoding.html#encode-quantization-map) have additional
| --- | --- |
restrictions specific to the [video profile](videocoding.html#video-profiles) they are used
with that **can** be enumerated using the
[vkGetPhysicalDeviceVideoFormatPropertiesKHR](videocoding.html#vkGetPhysicalDeviceVideoFormatPropertiesKHR) command. |

The following bits **may** be set in `bufferFeatures`, specifying that the
features are supported by [buffers](resources.html#VkBuffer) or [buffer views](resources.html#VkBufferView) created with the queried
[vkGetPhysicalDeviceFormatProperties2](#vkGetPhysicalDeviceFormatProperties2)::`format`:

* 
[VK_FORMAT_FEATURE_2_UNIFORM_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits2KHR) specifies that the
format **can** be used to create a buffer view that **can** be bound to a
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType) descriptor.

* 
[VK_FORMAT_FEATURE_2_STORAGE_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits2KHR) specifies that the
format **can** be used to create a buffer view that **can** be bound to a
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType) descriptor.

* 
[VK_FORMAT_FEATURE_2_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](#VkFormatFeatureFlagBits2KHR) specifies that
atomic operations are supported on
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType) with this format.

* 
[VK_FORMAT_FEATURE_2_VERTEX_BUFFER_BIT](#VkFormatFeatureFlagBits2KHR) specifies that the format
**can** be used as a vertex attribute format
(`VkVertexInputAttributeDescription`::`format`).

* 
[VK_FORMAT_FEATURE_2_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR](#VkFormatFeatureFlagBits2KHR)
specifies that the format **can** be used as the vertex format when
creating an [acceleration structure](accelstructures.html#acceleration-structure)
(`VkAccelerationStructureGeometryTrianglesDataKHR`::`vertexFormat`).
This format **can** also be used as the vertex format in host memory when
doing [host acceleration structure](accelstructures.html#host-acceleration-structure)
builds.

* 
[VK_FORMAT_FEATURE_2_ACCELERATION_STRUCTURE_RADIUS_BUFFER_BIT_NV](#VkFormatFeatureFlagBits2KHR)
specifies that the format **can** be used as the radius format when
creating an [acceleration structure](accelstructures.html#acceleration-structure)
(`VkAccelerationStructureGeometryLinearSweptSpheresDataNV`::`radiusFormat`
or
`VkAccelerationStructureGeometrySpheresDataNV`::`radiusFormat`).
This format **can** also be used as the radius format in host memory when
doing [host acceleration structure](accelstructures.html#host-acceleration-structure)
builds.

* 
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](#VkFormatFeatureFlagBits2KHR) specifies that
buffer views created with this format **can** be used as
[storage texel buffers](descriptors.html#descriptors-storagetexelbuffer) for read
operations without specifying a format.

* 
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](#VkFormatFeatureFlagBits2KHR) specifies
that buffer views created with this format **can** be used as
[storage texel buffers](descriptors.html#descriptors-storagetexelbuffer) for write
operations without specifying a format.

* 
[VK_FORMAT_FEATURE_2_OPTICAL_FLOW_IMAGE_BIT_NV](#VkFormatFeatureFlagBits2KHR) specifies that an
image view with this format **can** be used as an input or reference to
[optical flow operations](VK_NV_optical_flow/optical_flow.html#opticalflow-operations)

* 
[VK_FORMAT_FEATURE_2_OPTICAL_FLOW_VECTOR_BIT_NV](#VkFormatFeatureFlagBits2KHR) specifies that an
image view with this format **can** be used as a flow vector map (either as
hint, output or global flow) for [optical flow    operations](VK_NV_optical_flow/optical_flow.html#opticalflow-operations)

* 
[VK_FORMAT_FEATURE_2_OPTICAL_FLOW_COST_BIT_NV](#VkFormatFeatureFlagBits2KHR) specifies that an
image view with this format **can** be used as an output cost map for
[optical flow operations](VK_NV_optical_flow/optical_flow.html#opticalflow-operations)

* 
[VK_FORMAT_FEATURE_2_DATA_GRAPH_OPTICAL_FLOW_IMAGE_BIT_ARM](#VkFormatFeatureFlagBits2KHR)
specifies that an image view with this format **can** be used as an input
or reference to [optical flow    operations](VK_ARM_data_graph/graphs.html#graphs-operations-opticalflow)

* 
[VK_FORMAT_FEATURE_2_DATA_GRAPH_OPTICAL_FLOW_VECTOR_BIT_ARM](#VkFormatFeatureFlagBits2KHR)
specifies that an image view with this format **can** be used as a flow
vector map (either as hint, output or global flow) for
[optical flow operations](VK_ARM_data_graph/graphs.html#graphs-operations-opticalflow)

* 
[VK_FORMAT_FEATURE_2_DATA_GRAPH_OPTICAL_FLOW_COST_BIT_ARM](#VkFormatFeatureFlagBits2KHR) specifies
that an image view with this format **can** be used as an output cost map
for [optical flow operations](VK_ARM_data_graph/graphs.html#graphs-operations-opticalflow)

The [VkTensorFormatPropertiesARM](#VkTensorFormatPropertiesARM) structure describes properties of a
[VkFormat](#VkFormat) when that format is used to describe tensor elements.
These properties, like those of [VkFormatProperties2](#VkFormatProperties2), are independent
of any particular tensor.

The [VkTensorFormatPropertiesARM](#VkTensorFormatPropertiesARM) structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkTensorFormatPropertiesARM {
    VkStructureType          sType;
    void*                    pNext;
    VkFormatFeatureFlags2    optimalTilingTensorFeatures;
    VkFormatFeatureFlags2    linearTilingTensorFeatures;
} VkTensorFormatPropertiesARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`linearTilingTensorFeatures` is a bitmask of
[VkFormatFeatureFlagBits2](#VkFormatFeatureFlagBits2) specifying features supported by tensors
created with a `tiling` parameter of
[VK_TENSOR_TILING_LINEAR_ARM](resources.html#VkTensorTilingARM).

* 
`optimalTilingTensorFeatures` is a bitmask of
[VkFormatFeatureFlagBits2](#VkFormatFeatureFlagBits2) specifying features supported by tensors
created with a `tiling` parameter of
[VK_TENSOR_TILING_OPTIMAL_ARM](resources.html#VkTensorTilingARM).

Valid Usage (Implicit)

* 
[](#VUID-VkTensorFormatPropertiesARM-sType-sType) VUID-VkTensorFormatPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_FORMAT_PROPERTIES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFormatProperties2](#VkFormatProperties2)

The following bits **may** be set in `linearTilingTensorFeatures` and
`optimalTilingTensorFeatures`, specifying that the features are
supported by tensors or tensor views created with the queried
[vkGetPhysicalDeviceFormatProperties2](#vkGetPhysicalDeviceFormatProperties2)::`format`:

* 
[VK_FORMAT_FEATURE_2_TRANSFER_SRC_BIT](#VkFormatFeatureFlagBits2KHR) specifies that a tensor **can**
be used as a source tensor for [copy commands](copies.html#copies-tensors).

* 
[VK_FORMAT_FEATURE_2_TRANSFER_DST_BIT](#VkFormatFeatureFlagBits2KHR) specifies that a tensor **can**
be used as a destination tensor for [copy commands](copies.html#copies-tensors).

* 
[VK_FORMAT_FEATURE_2_TENSOR_SHADER_BIT_ARM](#VkFormatFeatureFlagBits2KHR) specifies that a tensor
view **can** be used as a [storage tensor](descriptors.html#descriptors-storagetensor) in
shaders.

* 
[VK_FORMAT_FEATURE_2_TENSOR_IMAGE_ALIASING_BIT_ARM](#VkFormatFeatureFlagBits2KHR) specifies that a
tensor **can** be aliased to an image or that an image **can** be aliased to a
tensor.

* 
[VK_FORMAT_FEATURE_2_TENSOR_DATA_GRAPH_BIT_ARM](#VkFormatFeatureFlagBits2KHR) specifies that a
tensor view **can** be used as a [storage    tensor](descriptors.html#descriptors-storagetensor) with [data graph pipelines](VK_ARM_data_graph/graphs.html#graphs-pipelines).

// Provided by VK_VERSION_1_3
typedef VkFlags64 VkFormatFeatureFlags2;

// Provided by VK_KHR_format_feature_flags2
// Equivalent to VkFormatFeatureFlags2
typedef VkFormatFeatureFlags2 VkFormatFeatureFlags2KHR;

`VkFormatFeatureFlags2` is a bitmask type for setting a mask of zero or
more [VkFormatFeatureFlagBits2](#VkFormatFeatureFlagBits2).

To query the performance characteristics of a [subpass resolve](renderpass.html#renderpass-subpass) operation for an attachment with a [VkFormat](#VkFormat), add a
[VkSubpassResolvePerformanceQueryEXT](#VkSubpassResolvePerformanceQueryEXT) structure to the `pNext` chain
of [VkFormatProperties2](#VkFormatProperties2).

The [VkSubpassResolvePerformanceQueryEXT](#VkSubpassResolvePerformanceQueryEXT) structure is defined as:

// Provided by VK_EXT_multisampled_render_to_single_sampled
typedef struct VkSubpassResolvePerformanceQueryEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           optimal;
} VkSubpassResolvePerformanceQueryEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`optimal` specifies that a subpass resolve operation is optimally
performed.

If `optimal` is [VK_FALSE](fundamentals.html#VK_FALSE) for a [VkFormat](#VkFormat), using a subpass
resolve operation on a multisampled attachment with this format can incur
additional costs, including additional memory bandwidth usage and a higher
memory footprint.
If an attachment with such a format is used in a
[multisampled-render-to-single-sampled](renderpass.html#subpass-multisampledrendertosinglesampled)
subpass, the additional memory and memory bandwidth usage can nullify the
benefits of using the `[VK_EXT_multisampled_render_to_single_sampled](../appendices/extensions.html#VK_EXT_multisampled_render_to_single_sampled)`
extension.

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassResolvePerformanceQueryEXT-sType-sType) VUID-VkSubpassResolvePerformanceQueryEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBPASS_RESOLVE_PERFORMANCE_QUERY_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFormatProperties2](#VkFormatProperties2)

Some [valid usage conditions](fundamentals.html#fundamentals-validusage) depend on the format
features supported by a [VkImage](resources.html#VkImage) whose [VkImageTiling](resources.html#VkImageTiling) is unknown.
In such cases the exact [VkFormatFeatureFlagBits](#VkFormatFeatureFlagBits) supported by the
[VkImage](resources.html#VkImage) cannot be determined, so the valid usage conditions are
expressed in terms of the *potential format features* of the [VkImage](resources.html#VkImage)
format.

The *potential format features* of a [VkFormat](#VkFormat) are defined as follows:

* 
The union of [VkFormatFeatureFlagBits](#VkFormatFeatureFlagBits)
and [VkFormatFeatureFlagBits2](#VkFormatFeatureFlagBits2),
supported when the [VkImageTiling](resources.html#VkImageTiling) is [VK_IMAGE_TILING_OPTIMAL](resources.html#VkImageTiling)
, [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](resources.html#VkImageTiling),
or [VK_IMAGE_TILING_LINEAR](resources.html#VkImageTiling)
if [VkFormat](#VkFormat) is not [VK_FORMAT_UNDEFINED](#VkFormat)

* 
[VkAndroidHardwareBufferFormatPropertiesANDROID](memory.html#VkAndroidHardwareBufferFormatPropertiesANDROID)::`formatFeatures`
and
[VkAndroidHardwareBufferFormatProperties2ANDROID](memory.html#VkAndroidHardwareBufferFormatProperties2ANDROID)::`formatFeatures`
of a valid external format if [VkFormat](#VkFormat) is
[VK_FORMAT_UNDEFINED](#VkFormat)

* 
[VkScreenBufferFormatPropertiesQNX](memory.html#VkScreenBufferFormatPropertiesQNX)::`formatFeatures` of a valid
external format if [VkFormat](#VkFormat) is [VK_FORMAT_UNDEFINED](#VkFormat)

Implementations **must** support at least the following set of features on the
listed formats.
For images, these features **must** be supported for every [VkImageType](resources.html#VkImageType)
(including arrayed and cube variants) unless otherwise noted.
These features are supported on existing formats without needing to
advertise an extension or needing to explicitly enable them.
Support for additional functionality beyond the requirements listed here is
queried using the [vkGetPhysicalDeviceFormatProperties](#vkGetPhysicalDeviceFormatProperties) command.

|  | Unless otherwise excluded below, the required formats are supported for all
| --- | --- |
[VkImageCreateFlags](resources.html#VkImageCreateFlags) values as long as those flag values are otherwise
allowed. |

The following tables show which feature bits **must** be supported for each
format.
Formats that are required to support
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) **must** also support
[VK_FORMAT_FEATURE_TRANSFER_SRC_BIT](#VkFormatFeatureFlagBits) and
[VK_FORMAT_FEATURE_TRANSFER_DST_BIT](#VkFormatFeatureFlagBits).

| ✓ | This feature **must** be supported on the named format |
| --- | --- |
| † | This feature **must** be supported on at least some
of the named formats, with more information in the table
where the symbol appears |
| ‡ | This feature **must** be supported with some caveats or
preconditions, with more information in the table where the symbol appears |
| § | This feature **must** be supported with some caveats or
preconditions, with more information in the table where the symbol appears |

| [VK_FORMAT_FEATURE_TRANSFER_SRC_BIT](#VkFormatFeatureFlagBits) |
| --- |
| [VK_FORMAT_FEATURE_TRANSFER_DST_BIT](#VkFormatFeatureFlagBits) |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) |
| [VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits) |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#VkFormatFeatureFlagBits) |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits) |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](#VkFormatFeatureFlagBits) |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) |
| [VK_FORMAT_FEATURE_BLIT_DST_BIT](#VkFormatFeatureFlagBits) |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](#VkFormatFeatureFlagBits) |
| [VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](#VkFormatFeatureFlagBits) |
| [VK_FORMAT_FEATURE_2_COPY_IMAGE_INDIRECT_DST_BIT_KHR](#VkFormatFeatureFlagBits2KHR) |

| [VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](#VkFormatFeatureFlagBits) |
| --- |
| [VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](#VkFormatFeatureFlagBits) |

| [VK_FORMAT_FEATURE_2_COPY_IMAGE_INDIRECT_DST_BIT_KHR](#VkFormatFeatureFlagBits2KHR) | ↓ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_DST_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| **Format** |
| [VK_FORMAT_UNDEFINED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R4G4_UNORM_PACK8](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R4G4B4A4_UNORM_PACK16](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B4G4R4A4_UNORM_PACK16](#VkFormat) | ✓ | ✓ | ✓ |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R5G6B5_UNORM_PACK16](#VkFormat) | ✓ | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  |  |  |  |  |  |
| [VK_FORMAT_B5G6R5_UNORM_PACK16](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R5G5B5A1_UNORM_PACK16](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B5G5R5A1_UNORM_PACK16](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_A1R5G5B5_UNORM_PACK16](#VkFormat) | ✓ | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  |  |  |  |  |  |
| [VK_FORMAT_A1B5G5R5_UNORM_PACK16](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_A4R4G4B4_UNORM_PACK16](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_A4B4G4R4_UNORM_PACK16](#VkFormat) | ‡ | ‡ | ‡ |  |  |  |  |  |  |  |  |  |  |  |
| Format features marked † **must** be supported for
`optimalTilingFeatures` if the `VkPhysicalDevice` supports the
[VkPhysicalDevice4444FormatsFeaturesEXT](features.html#VkPhysicalDevice4444FormatsFeaturesEXT)::`formatA4R4G4B4` feature. |
| Format features marked ‡ **must** be supported for
`optimalTilingFeatures` if the `VkPhysicalDevice` supports the
[VkPhysicalDevice4444FormatsFeaturesEXT](features.html#VkPhysicalDevice4444FormatsFeaturesEXT)::`formatA4B4G4R4` feature. |

| [VK_FORMAT_FEATURE_2_COPY_IMAGE_INDIRECT_DST_BIT_KHR](#VkFormatFeatureFlagBits2KHR) | ↓ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_DST_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| **Format** |
| [VK_FORMAT_R8_UNORM](#VkFormat) | ✓ | ✓ | ✓ | ‡ |  | ✓ | ✓ | ✓ |  | ✓ | ✓ |  |  | ✓ |
| [VK_FORMAT_R8_SNORM](#VkFormat) | ✓ | ✓ | ✓ | ‡ |  |  |  |  |  | ✓ | ✓ |  |  | ✓ |
| [VK_FORMAT_R8_USCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R8_SSCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R8_UINT](#VkFormat) | ✓ | ✓ |  | ‡ |  | ✓ | ✓ |  |  | ✓ | ✓ |  |  | ✓ |
| [VK_FORMAT_R8_SINT](#VkFormat) | ✓ | ✓ |  | ‡ |  | ✓ | ✓ |  |  | ✓ | ✓ |  |  | ✓ |
| [VK_FORMAT_R8_SRGB](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R8G8_UNORM](#VkFormat) | ✓ | ✓ | ✓ | ‡ |  | ✓ | ✓ | ✓ |  | ✓ | ✓ |  |  | ✓ |
| [VK_FORMAT_R8G8_SNORM](#VkFormat) | ✓ | ✓ | ✓ | ‡ |  |  |  |  |  | ✓ | ✓ |  |  | ✓ |
| [VK_FORMAT_R8G8_USCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R8G8_SSCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R8G8_UINT](#VkFormat) | ✓ | ✓ |  | ‡ |  | ✓ | ✓ |  |  | ✓ | ✓ |  |  | ✓ |
| [VK_FORMAT_R8G8_SINT](#VkFormat) | ✓ | ✓ |  | ‡ |  | ✓ | ✓ |  |  | ✓ | ✓ |  |  | ✓ |
| [VK_FORMAT_R8G8_SRGB](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R8G8B8_UNORM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R8G8B8_SNORM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R8G8B8_USCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R8G8B8_SSCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R8G8B8_UINT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R8G8B8_SINT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R8G8B8_SRGB](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B8G8R8_UNORM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B8G8R8_SNORM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B8G8R8_USCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B8G8R8_SSCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B8G8R8_UINT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B8G8R8_SINT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B8G8R8_SRGB](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_A8_UNORM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Format features marked with ‡ **must** be supported for
`optimalTilingFeatures` if the `VkPhysicalDevice` supports the
[`shaderStorageImageExtendedFormats`](features.html#features-shaderStorageImageExtendedFormats) feature. |

| [VK_FORMAT_FEATURE_2_COPY_IMAGE_INDIRECT_DST_BIT_KHR](#VkFormatFeatureFlagBits2KHR) | ↓ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_DST_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| **Format** |
| [VK_FORMAT_R8G8B8A8_UNORM](#VkFormat) | ✓ | ✓ | ✓ | ✓ |  | ✓ | ✓ | ✓ |  | ✓ | ✓ | ✓ |  | ✓ |
| [VK_FORMAT_R8G8B8A8_SNORM](#VkFormat) | ✓ | ✓ | ✓ | ✓ |  |  |  |  |  | ✓ | ✓ | ✓ |  | ✓ |
| [VK_FORMAT_R8G8B8A8_USCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R8G8B8A8_SSCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R8G8B8A8_UINT](#VkFormat) | ✓ | ✓ |  | ✓ |  | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  | ✓ |
| [VK_FORMAT_R8G8B8A8_SINT](#VkFormat) | ✓ | ✓ |  | ✓ |  | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  | ✓ |
| [VK_FORMAT_R8G8B8A8_SRGB](#VkFormat) | ✓ | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  |  |  |  |  |  |
| [VK_FORMAT_B8G8R8A8_UNORM](#VkFormat) | ✓ | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  | ✓ | ✓ |  |  |  |
| [VK_FORMAT_B8G8R8A8_SNORM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B8G8R8A8_USCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B8G8R8A8_SSCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B8G8R8A8_UINT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B8G8R8A8_SINT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B8G8R8A8_SRGB](#VkFormat) | ✓ | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  |  |  |  |  |  |
| [VK_FORMAT_A8B8G8R8_UNORM_PACK32](#VkFormat) | ✓ | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  | ✓ | ✓ | ✓ |  |  |
| [VK_FORMAT_A8B8G8R8_SNORM_PACK32](#VkFormat) | ✓ | ✓ | ✓ |  |  |  |  |  |  | ✓ | ✓ | ✓ |  |  |
| [VK_FORMAT_A8B8G8R8_USCALED_PACK32](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_A8B8G8R8_SSCALED_PACK32](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_A8B8G8R8_UINT_PACK32](#VkFormat) | ✓ | ✓ |  |  |  | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  |  |
| [VK_FORMAT_A8B8G8R8_SINT_PACK32](#VkFormat) | ✓ | ✓ |  |  |  | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  |  |
| [VK_FORMAT_A8B8G8R8_SRGB_PACK32](#VkFormat) | ✓ | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  |  |  |  |  |  |

| [VK_FORMAT_FEATURE_2_COPY_IMAGE_INDIRECT_DST_BIT_KHR](#VkFormatFeatureFlagBits2KHR) | ↓ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_DST_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| **Format** |
| [VK_FORMAT_A2R10G10B10_UNORM_PACK32](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_A2R10G10B10_SNORM_PACK32](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_A2R10G10B10_USCALED_PACK32](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_A2R10G10B10_SSCALED_PACK32](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_A2R10G10B10_UINT_PACK32](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_A2R10G10B10_SINT_PACK32](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_A2B10G10R10_UNORM_PACK32](#VkFormat) | ✓ | ✓ | ✓ | ‡ |  | ✓ | ✓ | ✓ |  | ✓ | ✓ |  |  | ✓ |
| [VK_FORMAT_A2B10G10R10_SNORM_PACK32](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_A2B10G10R10_USCALED_PACK32](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_A2B10G10R10_SSCALED_PACK32](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_A2B10G10R10_UINT_PACK32](#VkFormat) | ✓ | ✓ |  | ‡ |  | ✓ | ✓ |  |  |  | ✓ |  |  | ✓ |
| [VK_FORMAT_A2B10G10R10_SINT_PACK32](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R10X6_UNORM_PACK16](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R10X6G10X6_UNORM_2PACK16](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R12X4_UNORM_PACK16](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R12X4G12X4_UNORM_2PACK16](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R10X6_UINT_PACK16_ARM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R10X6G10X6_UINT_2PACK16_ARM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R10X6G10X6B10X6A10X6_UINT_4PACK16_ARM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R12X4_UINT_PACK16_ARM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R12X4G12X4_UINT_2PACK16_ARM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R12X4G12X4B12X4A12X4_UINT_4PACK16_ARM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R14X2_UINT_PACK16_ARM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R14X2G14X2_UINT_2PACK16_ARM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R14X2G14X2B14X2A14X2_UINT_4PACK16_ARM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R14X2_UNORM_PACK16_ARM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R14X2G14X2_UNORM_2PACK16_ARM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R14X2G14X2B14X2A14X2_UNORM_4PACK16_ARM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G14X2_B14X2R14X2_2PLANE_420_UNORM_3PACK16_ARM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G14X2_B14X2R14X2_2PLANE_422_UNORM_3PACK16_ARM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| Format features marked with ‡ **must** be supported for
`optimalTilingFeatures` if the `VkPhysicalDevice` supports the
[`shaderStorageImageExtendedFormats`](features.html#features-shaderStorageImageExtendedFormats) feature. |

| [VK_FORMAT_FEATURE_2_COPY_IMAGE_INDIRECT_DST_BIT_KHR](#VkFormatFeatureFlagBits2KHR) | ↓ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_DST_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| **Format** |
| [VK_FORMAT_R16_UNORM](#VkFormat) |  |  |  | ‡ |  |  |  |  |  | ✓ |  |  |  | ✓ |
| [VK_FORMAT_R16_SNORM](#VkFormat) |  |  |  | ‡ |  |  |  |  |  | ✓ |  |  |  | ✓ |
| [VK_FORMAT_R16_USCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R16_SSCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R16_UINT](#VkFormat) | ✓ | ✓ |  | ‡ |  | ✓ | ✓ |  |  | ✓ | ✓ |  |  | ✓ |
| [VK_FORMAT_R16_SINT](#VkFormat) | ✓ | ✓ |  | ‡ |  | ✓ | ✓ |  |  | ✓ | ✓ |  |  | ✓ |
| [VK_FORMAT_R16_SFLOAT](#VkFormat) | ✓ | ✓ | ✓ | ‡ |  | ✓ | ✓ | ✓ |  | ✓ | ✓ |  |  | ✓ |
| [VK_FORMAT_R16G16_UNORM](#VkFormat) |  |  |  | ‡ |  |  |  |  |  | ✓ |  |  |  | ✓ |
| [VK_FORMAT_R16G16_SNORM](#VkFormat) |  |  |  | ‡ |  |  |  |  |  | ✓ |  |  |  | ✓ |
| [VK_FORMAT_R16G16_USCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R16G16_SSCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R16G16_UINT](#VkFormat) | ✓ | ✓ |  | ‡ |  | ✓ | ✓ |  |  | ✓ | ✓ |  |  | ✓ |
| [VK_FORMAT_R16G16_SINT](#VkFormat) | ✓ | ✓ |  | ‡ |  | ✓ | ✓ |  |  | ✓ | ✓ |  |  | ✓ |
| [VK_FORMAT_R16G16_SFLOAT](#VkFormat) | ✓ | ✓ | ✓ | ‡ | § | ✓ | ✓ | ✓ |  | ✓ | ✓ | § |  | ✓ |
| [VK_FORMAT_R16G16B16_UNORM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R16G16B16_SNORM](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R16G16B16_USCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R16G16B16_SSCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R16G16B16_UINT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R16G16B16_SINT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R16G16B16_SFLOAT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R16G16B16A16_UNORM](#VkFormat) |  |  |  | ‡ |  |  |  |  |  | ✓ |  |  |  | ✓ |
| [VK_FORMAT_R16G16B16A16_SNORM](#VkFormat) |  |  |  | ‡ |  |  |  |  |  | ✓ |  |  |  | ✓ |
| [VK_FORMAT_R16G16B16A16_USCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R16G16B16A16_SSCALED](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R16G16B16A16_UINT](#VkFormat) | ✓ | ✓ |  | ✓ |  | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  | ✓ |
| [VK_FORMAT_R16G16B16A16_SINT](#VkFormat) | ✓ | ✓ |  | ✓ |  | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  | ✓ |
| [VK_FORMAT_R16G16B16A16_SFLOAT](#VkFormat) | ✓ | ✓ | ✓ | ✓ | § | ✓ | ✓ | ✓ |  | ✓ | ✓ | ✓ |  | ✓ |
| Format features marked with ‡ **must** be supported for
`optimalTilingFeatures` if the `VkPhysicalDevice` supports the
[`shaderStorageImageExtendedFormats`](features.html#features-shaderStorageImageExtendedFormats) feature. |
| Format features marked with § **must** be supported for
`optimalTilingFeatures` if the `VkPhysicalDevice` supports
the [`shaderFloat16VectorAtomics`](features.html#features-shaderFloat16VectorAtomics)
feature. |

| [VK_FORMAT_FEATURE_2_COPY_IMAGE_INDIRECT_DST_BIT_KHR](#VkFormatFeatureFlagBits2KHR) | ↓ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_DST_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| **Format** |
| [VK_FORMAT_R32_UINT](#VkFormat) | ✓ | ✓ |  | ✓ | ✓ | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  | ✓ |
| [VK_FORMAT_R32_SINT](#VkFormat) | ✓ | ✓ |  | ✓ | ✓ | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  | ✓ |
| [VK_FORMAT_R32_SFLOAT](#VkFormat) | ✓ | ✓ |  | ✓ | † | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  | ✓ |
| [VK_FORMAT_R32G32_UINT](#VkFormat) | ✓ | ✓ |  | ✓ |  | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  | ✓ |
| [VK_FORMAT_R32G32_SINT](#VkFormat) | ✓ | ✓ |  | ✓ |  | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  | ✓ |
| [VK_FORMAT_R32G32_SFLOAT](#VkFormat) | ✓ | ✓ |  | ✓ |  | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  | ✓ |
| [VK_FORMAT_R32G32B32_UINT](#VkFormat) |  |  |  |  |  |  |  |  |  | ✓ |  |  |  |  |
| [VK_FORMAT_R32G32B32_SINT](#VkFormat) |  |  |  |  |  |  |  |  |  | ✓ |  |  |  |  |
| [VK_FORMAT_R32G32B32_SFLOAT](#VkFormat) |  |  |  |  |  |  |  |  |  | ✓ |  |  |  |  |
| [VK_FORMAT_R32G32B32A32_UINT](#VkFormat) | ✓ | ✓ |  | ✓ |  | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  | ✓ |
| [VK_FORMAT_R32G32B32A32_SINT](#VkFormat) | ✓ | ✓ |  | ✓ |  | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  | ✓ |
| [VK_FORMAT_R32G32B32A32_SFLOAT](#VkFormat) | ✓ | ✓ |  | ✓ |  | ✓ | ✓ |  |  | ✓ | ✓ | ✓ |  | ✓ |
| Format features marked with † **must** be supported for
`optimalTilingFeatures` if the `VkPhysicalDevice` supports
the [`shaderImageFloat32Atomics`](features.html#features-shaderImageFloat32Atomics)
or the [`shaderImageFloat32AtomicAdd`](features.html#features-shaderImageFloat32AtomicAdd)
or the [`shaderImageFloat32AtomicMinMax`](features.html#features-shaderImageFloat32AtomicMinMax)
feature. |

| [VK_FORMAT_FEATURE_2_COPY_IMAGE_INDIRECT_DST_BIT_KHR](#VkFormatFeatureFlagBits2KHR) | ↓ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_DST_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| **Format** |
| [VK_FORMAT_R64_UINT](#VkFormat) |  |  |  | † | † |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R64_SINT](#VkFormat) |  |  |  | † | † |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R64_SFLOAT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R64G64_UINT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R64G64_SINT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R64G64_SFLOAT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R64G64B64_UINT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R64G64B64_SINT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R64G64B64_SFLOAT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R64G64B64A64_UINT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R64G64B64A64_SINT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R64G64B64A64_SFLOAT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B10G11R11_UFLOAT_PACK32](#VkFormat) | ✓ | ✓ | ✓ | ‡ |  |  |  |  |  |  | ✓ |  |  | ✓ |
| [VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](#VkFormat) | ✓ | ✓ | ✓ |  |  |  |  |  |  |  |  |  |  |  |
| Format features marked with ‡ **must** be supported for
`optimalTilingFeatures` if the `VkPhysicalDevice` supports the
[`shaderStorageImageExtendedFormats`](features.html#features-shaderStorageImageExtendedFormats) feature. |
| If the [`shaderImageInt64Atomics`](features.html#features-shaderImageInt64Atomics)
feature is supported, [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits) and
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](#VkFormatFeatureFlagBits) **must** be advertised in
`optimalTilingFeatures` for both [VK_FORMAT_R64_UINT](#VkFormat) and
[VK_FORMAT_R64_SINT](#VkFormat). |

| [VK_FORMAT_FEATURE_2_COPY_IMAGE_INDIRECT_DST_BIT_KHR](#VkFormatFeatureFlagBits2KHR) | ↓ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_DST_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| **Format** |
| [VK_FORMAT_D16_UNORM](#VkFormat) | ✓ | ✓ |  |  |  |  |  |  | ✓ |  |  |  |  |  |
| [VK_FORMAT_X8_D24_UNORM_PACK32](#VkFormat) |  |  |  |  |  |  |  |  | † |  |  |  |  |  |
| [VK_FORMAT_D32_SFLOAT](#VkFormat) | ✓ | ✓ |  |  |  |  |  |  | † |  |  |  |  |  |
| [VK_FORMAT_S8_UINT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_D16_UNORM_S8_UINT](#VkFormat) |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_D24_UNORM_S8_UINT](#VkFormat) |  |  |  |  |  |  |  |  | † |  |  |  |  |  |
| [VK_FORMAT_D32_SFLOAT_S8_UINT](#VkFormat) |  |  |  |  |  |  |  |  | † |  |  |  |  |  |
| [VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) feature **must** be
supported for at least one of [VK_FORMAT_X8_D24_UNORM_PACK32](#VkFormat) and
[VK_FORMAT_D32_SFLOAT](#VkFormat), and **must** be supported for at least one of
[VK_FORMAT_D24_UNORM_S8_UINT](#VkFormat) and [VK_FORMAT_D32_SFLOAT_S8_UINT](#VkFormat). |
| `bufferFeatures` **must** not support any features for these formats |

| [VK_FORMAT_FEATURE_2_COPY_IMAGE_INDIRECT_DST_BIT_KHR](#VkFormatFeatureFlagBits2KHR) | ↓ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_DST_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| **Format** |
| [VK_FORMAT_BC1_RGB_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_BC1_RGB_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_BC1_RGBA_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_BC1_RGBA_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_BC2_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_BC2_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_BC3_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_BC3_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_BC4_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_BC4_SNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_BC5_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_BC5_SNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_BC6H_UFLOAT_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_BC6H_SFLOAT_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_BC7_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_BC7_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| The [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits),
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#VkFormatFeatureFlagBits) features **must** be
supported in `optimalTilingFeatures` for all the formats in at least
one of: this table, [Mandatory Format Support: ETC2 and EAC Compressed Formats With VkImageType VK_IMAGE_TYPE_2D](#formats-mandatory-features-etc), or
[Mandatory Format Support: ASTC LDR Compressed Formats With VkImageType VK_IMAGE_TYPE_2D](#formats-mandatory-features-astc). |

| [VK_FORMAT_FEATURE_2_COPY_IMAGE_INDIRECT_DST_BIT_KHR](#VkFormatFeatureFlagBits2KHR) | ↓ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_DST_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| **Format** |
| [VK_FORMAT_ETC2_R8G8B8_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_EAC_R11_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_EAC_R11_SNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_EAC_R11G11_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_EAC_R11G11_SNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| The [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits),
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#VkFormatFeatureFlagBits) features **must** be
supported in `optimalTilingFeatures` for all the formats in at least
one of: this table, [Mandatory Format Support: BC Compressed Formats With VkImageType VK_IMAGE_TYPE_2D and VK_IMAGE_TYPE_3D](#formats-mandatory-features-bcn), or
[Mandatory Format Support: ASTC LDR Compressed Formats With VkImageType VK_IMAGE_TYPE_2D](#formats-mandatory-features-astc). |

| [VK_FORMAT_FEATURE_2_COPY_IMAGE_INDIRECT_DST_BIT_KHR](#VkFormatFeatureFlagBits2KHR) | ↓ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_DST_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| **Format** |
| [VK_FORMAT_ASTC_4x4_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_4x4_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_5x4_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_5x4_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_5x5_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_5x5_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_6x5_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_6x5_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_6x6_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_6x6_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_8x5_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_8x5_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_8x6_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_8x6_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_8x8_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_8x8_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_10x5_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_10x5_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_10x6_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_10x6_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_10x8_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_10x8_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_10x10_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_10x10_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_12x10_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_12x10_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_12x12_UNORM_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_ASTC_12x12_SRGB_BLOCK](#VkFormat) | † | † | † |  |  |  |  |  |  |  |  |  |  |  |
| The [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits),
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](#VkFormatFeatureFlagBits) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](#VkFormatFeatureFlagBits) features **must** be
supported in `optimalTilingFeatures` for all the formats in at least
one of: this table, [Mandatory Format Support: BC Compressed Formats With VkImageType VK_IMAGE_TYPE_2D and VK_IMAGE_TYPE_3D](#formats-mandatory-features-bcn), or
[Mandatory Format Support: ETC2 and EAC Compressed Formats With VkImageType VK_IMAGE_TYPE_2D](#formats-mandatory-features-etc). |

If cubic filtering is supported,
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](#VkFormatFeatureFlagBits) **must** be
supported for the following image view types:

* 
[VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType)

* 
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](resources.html#VkImageViewType)

for the following formats:

* 
[VK_FORMAT_R4G4_UNORM_PACK8](#VkFormat)

* 
[VK_FORMAT_R4G4B4A4_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_B4G4R4A4_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_R5G6B5_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_B5G6R5_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_R5G5B5A1_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_B5G5R5A1_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_A1R5G5B5_UNORM_PACK16](#VkFormat)

* 
[VK_FORMAT_R8_UNORM](#VkFormat)

* 
[VK_FORMAT_R8_SNORM](#VkFormat)

* 
[VK_FORMAT_R8_SRGB](#VkFormat)

* 
[VK_FORMAT_R8G8_UNORM](#VkFormat)

* 
[VK_FORMAT_R8G8_SNORM](#VkFormat)

* 
[VK_FORMAT_R8G8_SRGB](#VkFormat)

* 
[VK_FORMAT_R8G8B8_UNORM](#VkFormat)

* 
[VK_FORMAT_R8G8B8_SNORM](#VkFormat)

* 
[VK_FORMAT_R8G8B8_SRGB](#VkFormat)

* 
[VK_FORMAT_B8G8R8_UNORM](#VkFormat)

* 
[VK_FORMAT_B8G8R8_SNORM](#VkFormat)

* 
[VK_FORMAT_B8G8R8_SRGB](#VkFormat)

* 
[VK_FORMAT_R8G8B8A8_UNORM](#VkFormat)

* 
[VK_FORMAT_R8G8B8A8_SNORM](#VkFormat)

* 
[VK_FORMAT_R8G8B8A8_SRGB](#VkFormat)

* 
[VK_FORMAT_B8G8R8A8_UNORM](#VkFormat)

* 
[VK_FORMAT_B8G8R8A8_SNORM](#VkFormat)

* 
[VK_FORMAT_B8G8R8A8_SRGB](#VkFormat)

* 
[VK_FORMAT_A8B8G8R8_UNORM_PACK32](#VkFormat)

* 
[VK_FORMAT_A8B8G8R8_SNORM_PACK32](#VkFormat)

* 
[VK_FORMAT_A8B8G8R8_SRGB_PACK32](#VkFormat)

If ETC compressed formats are supported,
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](#VkFormatFeatureFlagBits) **must** be
supported for the following image view types:

* 
[VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType)

* 
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](resources.html#VkImageViewType)

for the following additional formats:

* 
[VK_FORMAT_ETC2_R8G8B8_UNORM_BLOCK](#VkFormat)

* 
[VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK](#VkFormat)

* 
[VK_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK](#VkFormat)

* 
[VK_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK](#VkFormat)

* 
[VK_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK](#VkFormat)

* 
[VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK](#VkFormat)

If cubic filtering is supported for any other formats, the following image
view types **must** be supported for those formats:

* 
[VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType)

* 
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](resources.html#VkImageViewType)

To be used with `VkImageView` with `subresourceRange.aspectMask`
equal to [VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits), [sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion) **must** be enabled for the following formats:

| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_TRANSFER_DST_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_TRANSFER_SRC_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) | ↓ |
| [VK_FORMAT_FEATURE_DISJOINT_BIT](#VkFormatFeatureFlagBits) | ↓ |
| **Format** | **Planes** |
| [VK_FORMAT_G8B8G8R8_422_UNORM](#VkFormat) | 1 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B8G8R8G8_422_UNORM](#VkFormat) | 1 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM](#VkFormat) | 3 |  | † | † | † | † |  |  |  |  |  |
| [VK_FORMAT_G8_B8R8_2PLANE_420_UNORM](#VkFormat) | 2 |  | † | † | † | † |  |  |  |  |  |
| [VK_FORMAT_G8_B8_R8_3PLANE_422_UNORM](#VkFormat) | 3 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G8_B8R8_2PLANE_422_UNORM](#VkFormat) | 2 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G8_B8_R8_3PLANE_444_UNORM](#VkFormat) | 3 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16](#VkFormat) ‡ | 1 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16](#VkFormat) | 1 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16](#VkFormat) | 1 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16](#VkFormat) | 3 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16](#VkFormat) | 2 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16](#VkFormat) | 3 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16](#VkFormat) | 2 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16](#VkFormat) | 3 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16](#VkFormat) | 1 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16](#VkFormat) | 1 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16](#VkFormat) | 1 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16](#VkFormat) | 3 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16](#VkFormat) | 2 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16](#VkFormat) | 3 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16](#VkFormat) | 2 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16](#VkFormat) | 3 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G16B16G16R16_422_UNORM](#VkFormat) | 1 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_B16G16R16G16_422_UNORM](#VkFormat) | 1 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G16_B16_R16_3PLANE_420_UNORM](#VkFormat) | 3 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G16_B16R16_2PLANE_420_UNORM](#VkFormat) | 2 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G16_B16_R16_3PLANE_422_UNORM](#VkFormat) | 3 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G16_B16R16_2PLANE_422_UNORM](#VkFormat) | 2 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G16_B16_R16_3PLANE_444_UNORM](#VkFormat) | 3 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](#VkFormat) | 2 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](#VkFormat) | 2 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](#VkFormat) | 2 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](#VkFormat) | 2 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G14X2_B14X2R14X2_2PLANE_420_UNORM_3PACK16_ARM](#VkFormat) | 2 |  |  |  |  |  |  |  |  |  |  |
| [VK_FORMAT_G14X2_B14X2R14X2_2PLANE_422_UNORM_3PACK16_ARM](#VkFormat) | 2 |  |  |  |  |  |  |  |  |  |  |
| Format features marked † **must** be supported for
`optimalTilingFeatures` with [VkImageType](resources.html#VkImageType)
[VK_IMAGE_TYPE_2D](resources.html#VkImageType) if the `VkPhysicalDevice` supports the
[VkPhysicalDeviceSamplerYcbcrConversionFeatures](features.html#VkPhysicalDeviceSamplerYcbcrConversionFeatures) feature. |
| Formats marked ‡ do not require a sampler Y′CBCR conversion for
[VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits) image views if the
[VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT](features.html#VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT)::`formatRgba10x6WithoutYCbCrSampler`
feature is enabled. |

Implementations are not required to support the
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](resources.html#VkImageCreateFlagBits),
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits), or
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](resources.html#VkImageCreateFlagBits) [VkImageCreateFlags](resources.html#VkImageCreateFlags) for the
above formats that require [sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion).
To determine whether the implementation supports sparse image creation flags
with these formats use [vkGetPhysicalDeviceImageFormatProperties](capabilities.html#vkGetPhysicalDeviceImageFormatProperties) or
[vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2).

[VK_FORMAT_FEATURE_FRAGMENT_DENSITY_MAP_BIT_EXT](#VkFormatFeatureFlagBits) **must** be supported for
the following formats if the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature is enabled:

* 
[VK_FORMAT_R8G8_UNORM](#VkFormat)

[VK_FORMAT_FEATURE_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR](#VkFormatFeatureFlagBits) **must**
be supported in `bufferFeatures` for the following formats if the
[`accelerationStructure`](features.html#features-accelerationStructure) feature is
supported:

* 
[VK_FORMAT_R32G32_SFLOAT](#VkFormat)

* 
[VK_FORMAT_R32G32B32_SFLOAT](#VkFormat)

* 
[VK_FORMAT_R16G16_SFLOAT](#VkFormat)

* 
[VK_FORMAT_R16G16B16A16_SFLOAT](#VkFormat)

* 
[VK_FORMAT_R16G16_SNORM](#VkFormat)

* 
[VK_FORMAT_R16G16B16A16_SNORM](#VkFormat)

[VK_FORMAT_FEATURE_2_ACCELERATION_STRUCTURE_RADIUS_BUFFER_BIT_NV](#VkFormatFeatureFlagBits2KHR) **must**
be supported in `bufferFeatures` for the following formats if either of
the [`spheres`](features.html#features-spheres) or [`linearSweptSpheres`](features.html#features-linearSweptSpheres) feature is supported:

* 
[VK_FORMAT_R32_SFLOAT](#VkFormat)

* 
[VK_FORMAT_R16_SFLOAT](#VkFormat)

[VK_FORMAT_FEATURE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkFormatFeatureFlagBits) **must** be
supported for the following formats if the
[`attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) feature is supported:

* 
[VK_FORMAT_R8_UINT](#VkFormat)

If the [`hostImageCopy`](features.html#features-hostImageCopy) feature is supported
and [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) is supported in
`optimalTilingFeatures` or `linearTilingFeatures` for a color
format, [VK_FORMAT_FEATURE_2_HOST_IMAGE_TRANSFER_BIT](#VkFormatFeatureFlagBits2KHR) **must** also be
supported in `optimalTilingFeatures` or `linearTilingFeatures`
respectively.

The device-level features for using a storage image or a storage texel
buffer with an image format of `Unknown`,
[`shaderStorageImageReadWithoutFormat`](features.html#features-shaderStorageImageReadWithoutFormat) and
[`shaderStorageImageWriteWithoutFormat`](features.html#features-shaderStorageImageWriteWithoutFormat), only apply to the following
formats:

* 
[VK_FORMAT_R8G8B8A8_UNORM](#VkFormat)

* 
[VK_FORMAT_R8G8B8A8_SNORM](#VkFormat)

* 
[VK_FORMAT_R8G8B8A8_UINT](#VkFormat)

* 
[VK_FORMAT_R8G8B8A8_SINT](#VkFormat)

* 
[VK_FORMAT_R32_UINT](#VkFormat)

* 
[VK_FORMAT_R32_SINT](#VkFormat)

* 
[VK_FORMAT_R32_SFLOAT](#VkFormat)

* 
[VK_FORMAT_R32G32_UINT](#VkFormat)

* 
[VK_FORMAT_R32G32_SINT](#VkFormat)

* 
[VK_FORMAT_R32G32_SFLOAT](#VkFormat)

* 
[VK_FORMAT_R32G32B32A32_UINT](#VkFormat)

* 
[VK_FORMAT_R32G32B32A32_SINT](#VkFormat)

* 
[VK_FORMAT_R32G32B32A32_SFLOAT](#VkFormat)

* 
[VK_FORMAT_R16G16B16A16_UINT](#VkFormat)

* 
[VK_FORMAT_R16G16B16A16_SINT](#VkFormat)

* 
[VK_FORMAT_R16G16B16A16_SFLOAT](#VkFormat)

* 
[VK_FORMAT_R16G16_SFLOAT](#VkFormat)

* 
[VK_FORMAT_B10G11R11_UFLOAT_PACK32](#VkFormat)

* 
[VK_FORMAT_R16_SFLOAT](#VkFormat)

* 
[VK_FORMAT_R16G16B16A16_UNORM](#VkFormat)

* 
[VK_FORMAT_A2B10G10R10_UNORM_PACK32](#VkFormat)

* 
[VK_FORMAT_R16G16_UNORM](#VkFormat)

* 
[VK_FORMAT_R8G8_UNORM](#VkFormat)

* 
[VK_FORMAT_R16_UNORM](#VkFormat)

* 
[VK_FORMAT_R8_UNORM](#VkFormat)

* 
[VK_FORMAT_R16G16B16A16_SNORM](#VkFormat)

* 
[VK_FORMAT_R16G16_SNORM](#VkFormat)

* 
[VK_FORMAT_R8G8_SNORM](#VkFormat)

* 
[VK_FORMAT_R16_SNORM](#VkFormat)

* 
[VK_FORMAT_R8_SNORM](#VkFormat)

* 
[VK_FORMAT_R16G16_SINT](#VkFormat)

* 
[VK_FORMAT_R8G8_SINT](#VkFormat)

* 
[VK_FORMAT_R16_SINT](#VkFormat)

* 
[VK_FORMAT_R8_SINT](#VkFormat)

* 
[VK_FORMAT_A2B10G10R10_UINT_PACK32](#VkFormat)

* 
[VK_FORMAT_R16G16_UINT](#VkFormat)

* 
[VK_FORMAT_R8G8_UINT](#VkFormat)

* 
[VK_FORMAT_R16_UINT](#VkFormat)

* 
[VK_FORMAT_R8_UINT](#VkFormat)

* 
[VK_FORMAT_A8_UNORM](#VkFormat)

|  | This list of formats is the union of required storage formats from
| --- | --- |
[Required Format Support](#features-required-format-support) section and
formats listed in [`shaderStorageImageExtendedFormats`](features.html#features-shaderStorageImageExtendedFormats). |

An implementation that supports [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits)
for any format from the given list of formats and supports
[`shaderStorageImageReadWithoutFormat`](features.html#features-shaderStorageImageReadWithoutFormat) **must** support
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](#VkFormatFeatureFlagBits2KHR) for that same
format if Vulkan 1.3 or the `[VK_KHR_format_feature_flags2](../appendices/extensions.html#VK_KHR_format_feature_flags2)` extension
is supported.

An implementation that supports [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits)
for any format from the given list of formats and supports
[`shaderStorageImageWriteWithoutFormat`](features.html#features-shaderStorageImageWriteWithoutFormat) **must** support
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](#VkFormatFeatureFlagBits2KHR) for that same
format if Vulkan 1.3 or the `[VK_KHR_format_feature_flags2](../appendices/extensions.html#VK_KHR_format_feature_flags2)` extension
is supported.

An implementation that does not support either of
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](#VkFormatFeatureFlagBits2KHR) or
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](#VkFormatFeatureFlagBits2KHR) for a format
**must** not report support for [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits) or
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) for that format if it is
not listed in the [SPIR-V and Vulkan Image Format Compatibility](../appendices/spirvenv.html#spirvenv-image-formats) table.

|  | Some older implementations do not follow this restriction.
| --- | --- |
They report support for formats as storage images even though they do not
support access without the `Format` qualifier and there is no matching
`Format` token.
Such images cannot be either read from or written to.

Drivers which pass Vulkan conformance test suite version 1.3.9.0, or any
subsequent version will conform to the requirement above. |

If Vulkan 1.3 or the `[VK_KHR_format_feature_flags2](../appendices/extensions.html#VK_KHR_format_feature_flags2)` extension is
supported, a depth/stencil format with a depth component supporting
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) **must** support
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](#VkFormatFeatureFlagBits2KHR).

Certain resource usage flags depend on support for the corresponding format
feature flag for the format in question.
The following tables list the
[VkBufferUsageFlagBits](resources.html#VkBufferUsageFlagBits), [VkImageUsageFlagBits](resources.html#VkImageUsageFlagBits) and
[VkTensorUsageFlagBitsARM](resources.html#VkTensorUsageFlagBitsARM)
that have such dependencies, and the format feature flags they depend on.
Additional restrictions, including, but not limited to, further required
format feature flags specific to the particular use of the resource **may**
apply, as described in the respective sections of this specification.

| Buffer usage flag | Required format feature flag |
| --- | --- |
| [VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) | [VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) |
| [VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) | [VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](#VkFormatFeatureFlagBits) |
| [VK_BUFFER_USAGE_VERTEX_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) | [VK_FORMAT_FEATURE_VERTEX_BUFFER_BIT](#VkFormatFeatureFlagBits) |

| Image usage flag | Required format feature flag |
| --- | --- |
| [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) | [VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](#VkFormatFeatureFlagBits) |
| [VK_IMAGE_USAGE_STORAGE_BIT](resources.html#VkImageUsageFlagBits) | [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](#VkFormatFeatureFlagBits) |
| [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) | [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) |
| [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) | [VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) |
| [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) | [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) or [VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkFormatFeatureFlagBits) |
| [VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](resources.html#VkImageUsageFlagBits) | [VK_FORMAT_FEATURE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkFormatFeatureFlagBits) |
| [VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](resources.html#VkImageUsageFlagBits) | [VK_FORMAT_FEATURE_VIDEO_DECODE_OUTPUT_BIT_KHR](#VkFormatFeatureFlagBits) |
| [VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](resources.html#VkImageUsageFlagBits) | [VK_FORMAT_FEATURE_VIDEO_DECODE_DPB_BIT_KHR](#VkFormatFeatureFlagBits) |
| [VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](resources.html#VkImageUsageFlagBits) | [VK_FORMAT_FEATURE_VIDEO_ENCODE_INPUT_BIT_KHR](#VkFormatFeatureFlagBits) |
| [VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](resources.html#VkImageUsageFlagBits) | [VK_FORMAT_FEATURE_VIDEO_ENCODE_DPB_BIT_KHR](#VkFormatFeatureFlagBits) |
| [VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](resources.html#VkImageUsageFlagBits) | [VK_FORMAT_FEATURE_2_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](#VkFormatFeatureFlagBits2KHR) |
| [VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](resources.html#VkImageUsageFlagBits) | [VK_FORMAT_FEATURE_2_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](#VkFormatFeatureFlagBits2KHR) |
| [VK_IMAGE_USAGE_TENSOR_ALIASING_BIT_ARM](resources.html#VkImageUsageFlagBits) | [VK_FORMAT_FEATURE_2_TENSOR_IMAGE_ALIASING_BIT_ARM](#VkFormatFeatureFlagBits2KHR) |

| Tensor usage flag | Required format feature flag |
| --- | --- |
| [VK_TENSOR_USAGE_TRANSFER_SRC_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM) | [VK_FORMAT_FEATURE_2_TRANSFER_SRC_BIT](#VkFormatFeatureFlagBits2KHR) |
| [VK_TENSOR_USAGE_TRANSFER_DST_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM) | [VK_FORMAT_FEATURE_2_TRANSFER_DST_BIT](#VkFormatFeatureFlagBits2KHR) |
| [VK_TENSOR_USAGE_IMAGE_ALIASING_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM) | [VK_FORMAT_FEATURE_2_TENSOR_IMAGE_ALIASING_BIT_ARM](#VkFormatFeatureFlagBits2KHR) |
| [VK_TENSOR_USAGE_SHADER_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM) | [VK_FORMAT_FEATURE_2_TENSOR_SHADER_BIT_ARM](#VkFormatFeatureFlagBits2KHR) |
| [VK_TENSOR_USAGE_DATA_GRAPH_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM) | [VK_FORMAT_FEATURE_2_TENSOR_DATA_GRAPH_BIT_ARM](#VkFormatFeatureFlagBits2KHR) |

For tensors, implementations **must** support at least the following set of
features on the listed tensor formats.

The following tables show which tensor feature bits **must** be supported for
each format.

| ✓ | This feature **must** be supported on the named format |
| --- | --- |
| † | This feature **must** be supported on at least some
of the named formats, with more information in the table
where the symbol appears |

| [VK_FORMAT_FEATURE_2_TRANSFER_SRC_BIT](#VkFormatFeatureFlagBits2KHR) |
| --- |
| [VK_FORMAT_FEATURE_2_TRANSFER_DST_BIT](#VkFormatFeatureFlagBits2KHR) |
| [VK_FORMAT_FEATURE_2_TENSOR_SHADER_BIT_ARM](#VkFormatFeatureFlagBits2KHR) |

| [VK_FORMAT_FEATURE_2_TRANSFER_SRC_BIT](#VkFormatFeatureFlagBits2KHR) |
| --- |
| [VK_FORMAT_FEATURE_2_TRANSFER_DST_BIT](#VkFormatFeatureFlagBits2KHR) |
| [VK_FORMAT_FEATURE_2_TENSOR_SHADER_BIT_ARM](#VkFormatFeatureFlagBits2KHR) |

| [VK_FORMAT_FEATURE_2_TRANSFER_SRC_BIT](#VkFormatFeatureFlagBits2KHR) | ↓ |
| --- | --- | --- | --- |
| [VK_FORMAT_FEATURE_2_TRANSFER_DST_BIT](#VkFormatFeatureFlagBits2KHR) | ↓ |
| [VK_FORMAT_FEATURE_2_TENSOR_SHADER_BIT_ARM](#VkFormatFeatureFlagBits2KHR) | ↓ |
| **Format** |
| [VK_FORMAT_UNDEFINED](#VkFormat) |  |  |  |
| [VK_FORMAT_R8_BOOL_ARM](#VkFormat) |  |  |  |
| [VK_FORMAT_R8_UNORM](#VkFormat) |  |  |  |
| [VK_FORMAT_R8_SNORM](#VkFormat) |  |  |  |
| [VK_FORMAT_R8_USCALED](#VkFormat) |  |  |  |
| [VK_FORMAT_R8_SSCALED](#VkFormat) |  |  |  |
| [VK_FORMAT_R8_UINT](#VkFormat) |  |  |  |
| [VK_FORMAT_R8_SINT](#VkFormat) |  |  |  |
| [VK_FORMAT_R16_UNORM](#VkFormat) |  |  |  |
| [VK_FORMAT_R16_SNORM](#VkFormat) |  |  |  |
| [VK_FORMAT_R16_USCALED](#VkFormat) |  |  |  |
| [VK_FORMAT_R16_SSCALED](#VkFormat) |  |  |  |
| [VK_FORMAT_R16_UINT](#VkFormat) |  |  |  |
| [VK_FORMAT_R16_SINT](#VkFormat) |  |  |  |
| [VK_FORMAT_R16_SFLOAT](#VkFormat) |  |  |  |
| [VK_FORMAT_R32_UINT](#VkFormat) |  |  |  |
| [VK_FORMAT_R32_SINT](#VkFormat) |  |  |  |
| [VK_FORMAT_R32_SFLOAT](#VkFormat) |  |  |  |
| [VK_FORMAT_R64_UINT](#VkFormat) |  |  |  |
| [VK_FORMAT_R64_SINT](#VkFormat) |  |  |  |
| [VK_FORMAT_R64_SFLOAT](#VkFormat) |  |  |  |
