# VkFormat(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFormat.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFormat - Available image formats

The following image formats **can** be passed to, and **may** be returned from
Vulkan commands.
The memory required to store each format is discussed with that format, and
also summarized in the [Representation and Texel Block Size](../../../../spec/latest/chapters/formats.html#texel-block-size) section and the [Compatible formats](../../../../spec/latest/chapters/formats.html#formats-compatibility) table.

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
[VK_FORMAT_UNDEFINED](#) specifies that the format is not specified.

* 
[VK_FORMAT_R4G4_UNORM_PACK8](#) specifies a two-component, 8-bit packed
unsigned normalized format that has a 4-bit R component in bits 4..7,
and a 4-bit G component in bits 0..3.

* 
[VK_FORMAT_R4G4B4A4_UNORM_PACK16](#) specifies a four-component, 16-bit
packed unsigned normalized format that has a 4-bit R component in bits
12..15, a 4-bit G component in bits 8..11, a 4-bit B component in bits
4..7, and a 4-bit A component in bits 0..3.

* 
[VK_FORMAT_B4G4R4A4_UNORM_PACK16](#) specifies a four-component, 16-bit
packed unsigned normalized format that has a 4-bit B component in bits
12..15, a 4-bit G component in bits 8..11, a 4-bit R component in bits
4..7, and a 4-bit A component in bits 0..3.

* 
[VK_FORMAT_A4R4G4B4_UNORM_PACK16](#) specifies a four-component, 16-bit
packed unsigned normalized format that has a 4-bit A component in bits
12..15, a 4-bit R component in bits 8..11, a 4-bit G component in bits
4..7, and a 4-bit B component in bits 0..3.

* 
[VK_FORMAT_A4B4G4R4_UNORM_PACK16](#) specifies a four-component, 16-bit
packed unsigned normalized format that has a 4-bit A component in bits
12..15, a 4-bit B component in bits 8..11, a 4-bit G component in bits
4..7, and a 4-bit R component in bits 0..3.

* 
[VK_FORMAT_R5G6B5_UNORM_PACK16](#) specifies a three-component, 16-bit
packed unsigned normalized format that has a 5-bit R component in bits
11..15, a 6-bit G component in bits 5..10, and a 5-bit B component in
bits 0..4.

* 
[VK_FORMAT_B5G6R5_UNORM_PACK16](#) specifies a three-component, 16-bit
packed unsigned normalized format that has a 5-bit B component in bits
11..15, a 6-bit G component in bits 5..10, and a 5-bit R component in
bits 0..4.

* 
[VK_FORMAT_R5G5B5A1_UNORM_PACK16](#) specifies a four-component, 16-bit
packed unsigned normalized format that has a 5-bit R component in bits
11..15, a 5-bit G component in bits 6..10, a 5-bit B component in bits
1..5, and a 1-bit A component in bit 0.

* 
[VK_FORMAT_B5G5R5A1_UNORM_PACK16](#) specifies a four-component, 16-bit
packed unsigned normalized format that has a 5-bit B component in bits
11..15, a 5-bit G component in bits 6..10, a 5-bit R component in bits
1..5, and a 1-bit A component in bit 0.

* 
[VK_FORMAT_A1R5G5B5_UNORM_PACK16](#) specifies a four-component, 16-bit
packed unsigned normalized format that has a 1-bit A component in bit
15, a 5-bit R component in bits 10..14, a 5-bit G component in bits
5..9, and a 5-bit B component in bits 0..4.

* 
[VK_FORMAT_A1B5G5R5_UNORM_PACK16](#) specifies a four-component, 16-bit
packed unsigned normalized format that has a 1-bit A component in bit
15, a 5-bit B component in bits 10..14, a 5-bit G component in bits
5..9, and a 5-bit R component in bits 0..4.

* 
[VK_FORMAT_A8_UNORM](#) specifies a one-component, 8-bit unsigned
normalized format that has a single 8-bit A component.

* 
[VK_FORMAT_R8_UNORM](#) specifies a one-component, 8-bit unsigned
normalized format that has a single 8-bit R component.

* 
[VK_FORMAT_R8_SNORM](#) specifies a one-component, 8-bit signed
normalized format that has a single 8-bit R component.

* 
[VK_FORMAT_R8_USCALED](#) specifies a one-component, 8-bit unsigned
scaled integer format that has a single 8-bit R component.

* 
[VK_FORMAT_R8_SSCALED](#) specifies a one-component, 8-bit signed
scaled integer format that has a single 8-bit R component.

* 
[VK_FORMAT_R8_UINT](#) specifies a one-component, 8-bit unsigned
integer format that has a single 8-bit R component.

* 
[VK_FORMAT_R8_SINT](#) specifies a one-component, 8-bit signed integer
format that has a single 8-bit R component.

* 
[VK_FORMAT_R8_SRGB](#) specifies a one-component, 8-bit unsigned
normalized format that has a single 8-bit R component stored with sRGB
nonlinear encoding.

* 
[VK_FORMAT_R8G8_UNORM](#) specifies a two-component, 16-bit unsigned
normalized format that has an 8-bit R component in byte 0, and an 8-bit
G component in byte 1.

* 
[VK_FORMAT_R8G8_SNORM](#) specifies a two-component, 16-bit signed
normalized format that has an 8-bit R component in byte 0, and an 8-bit
G component in byte 1.

* 
[VK_FORMAT_R8G8_USCALED](#) specifies a two-component, 16-bit unsigned
scaled integer format that has an 8-bit R component in byte 0, and an
8-bit G component in byte 1.

* 
[VK_FORMAT_R8G8_SSCALED](#) specifies a two-component, 16-bit signed
scaled integer format that has an 8-bit R component in byte 0, and an
8-bit G component in byte 1.

* 
[VK_FORMAT_R8G8_UINT](#) specifies a two-component, 16-bit unsigned
integer format that has an 8-bit R component in byte 0, and an 8-bit G
component in byte 1.

* 
[VK_FORMAT_R8G8_SINT](#) specifies a two-component, 16-bit signed
integer format that has an 8-bit R component in byte 0, and an 8-bit G
component in byte 1.

* 
[VK_FORMAT_R8G8_SRGB](#) specifies a two-component, 16-bit unsigned
normalized format that has an 8-bit R component stored with sRGB
nonlinear encoding in byte 0, and an 8-bit G component stored with sRGB
nonlinear encoding in byte 1.

* 
[VK_FORMAT_R8G8B8_UNORM](#) specifies a three-component, 24-bit
unsigned normalized format that has an 8-bit R component in byte 0, an
8-bit G component in byte 1, and an 8-bit B component in byte 2.

* 
[VK_FORMAT_R8G8B8_SNORM](#) specifies a three-component, 24-bit signed
normalized format that has an 8-bit R component in byte 0, an 8-bit G
component in byte 1, and an 8-bit B component in byte 2.

* 
[VK_FORMAT_R8G8B8_USCALED](#) specifies a three-component, 24-bit
unsigned scaled format that has an 8-bit R component in byte 0, an 8-bit
G component in byte 1, and an 8-bit B component in byte 2.

* 
[VK_FORMAT_R8G8B8_SSCALED](#) specifies a three-component, 24-bit
signed scaled format that has an 8-bit R component in byte 0, an 8-bit G
component in byte 1, and an 8-bit B component in byte 2.

* 
[VK_FORMAT_R8G8B8_UINT](#) specifies a three-component, 24-bit unsigned
integer format that has an 8-bit R component in byte 0, an 8-bit G
component in byte 1, and an 8-bit B component in byte 2.

* 
[VK_FORMAT_R8G8B8_SINT](#) specifies a three-component, 24-bit signed
integer format that has an 8-bit R component in byte 0, an 8-bit G
component in byte 1, and an 8-bit B component in byte 2.

* 
[VK_FORMAT_R8G8B8_SRGB](#) specifies a three-component, 24-bit unsigned
normalized format that has an 8-bit R component stored with sRGB
nonlinear encoding in byte 0, an 8-bit G component stored with sRGB
nonlinear encoding in byte 1, and an 8-bit B component stored with sRGB
nonlinear encoding in byte 2.

* 
[VK_FORMAT_B8G8R8_UNORM](#) specifies a three-component, 24-bit
unsigned normalized format that has an 8-bit B component in byte 0, an
8-bit G component in byte 1, and an 8-bit R component in byte 2.

* 
[VK_FORMAT_B8G8R8_SNORM](#) specifies a three-component, 24-bit signed
normalized format that has an 8-bit B component in byte 0, an 8-bit G
component in byte 1, and an 8-bit R component in byte 2.

* 
[VK_FORMAT_B8G8R8_USCALED](#) specifies a three-component, 24-bit
unsigned scaled format that has an 8-bit B component in byte 0, an 8-bit
G component in byte 1, and an 8-bit R component in byte 2.

* 
[VK_FORMAT_B8G8R8_SSCALED](#) specifies a three-component, 24-bit
signed scaled format that has an 8-bit B component in byte 0, an 8-bit G
component in byte 1, and an 8-bit R component in byte 2.

* 
[VK_FORMAT_B8G8R8_UINT](#) specifies a three-component, 24-bit unsigned
integer format that has an 8-bit B component in byte 0, an 8-bit G
component in byte 1, and an 8-bit R component in byte 2.

* 
[VK_FORMAT_B8G8R8_SINT](#) specifies a three-component, 24-bit signed
integer format that has an 8-bit B component in byte 0, an 8-bit G
component in byte 1, and an 8-bit R component in byte 2.

* 
[VK_FORMAT_B8G8R8_SRGB](#) specifies a three-component, 24-bit unsigned
normalized format that has an 8-bit B component stored with sRGB
nonlinear encoding in byte 0, an 8-bit G component stored with sRGB
nonlinear encoding in byte 1, and an 8-bit R component stored with sRGB
nonlinear encoding in byte 2.

* 
[VK_FORMAT_R8G8B8A8_UNORM](#) specifies a four-component, 32-bit
unsigned normalized format that has an 8-bit R component in byte 0, an
8-bit G component in byte 1, an 8-bit B component in byte 2, and an
8-bit A component in byte 3.

* 
[VK_FORMAT_R8G8B8A8_SNORM](#) specifies a four-component, 32-bit signed
normalized format that has an 8-bit R component in byte 0, an 8-bit G
component in byte 1, an 8-bit B component in byte 2, and an 8-bit A
component in byte 3.

* 
[VK_FORMAT_R8G8B8A8_USCALED](#) specifies a four-component, 32-bit
unsigned scaled format that has an 8-bit R component in byte 0, an 8-bit
G component in byte 1, an 8-bit B component in byte 2, and an 8-bit A
component in byte 3.

* 
[VK_FORMAT_R8G8B8A8_SSCALED](#) specifies a four-component, 32-bit
signed scaled format that has an 8-bit R component in byte 0, an 8-bit G
component in byte 1, an 8-bit B component in byte 2, and an 8-bit A
component in byte 3.

* 
[VK_FORMAT_R8G8B8A8_UINT](#) specifies a four-component, 32-bit
unsigned integer format that has an 8-bit R component in byte 0, an
8-bit G component in byte 1, an 8-bit B component in byte 2, and an
8-bit A component in byte 3.

* 
[VK_FORMAT_R8G8B8A8_SINT](#) specifies a four-component, 32-bit signed
integer format that has an 8-bit R component in byte 0, an 8-bit G
component in byte 1, an 8-bit B component in byte 2, and an 8-bit A
component in byte 3.

* 
[VK_FORMAT_R8G8B8A8_SRGB](#) specifies a four-component, 32-bit
unsigned normalized format that has an 8-bit R component stored with
sRGB nonlinear encoding in byte 0, an 8-bit G component stored with sRGB
nonlinear encoding in byte 1, an 8-bit B component stored with sRGB
nonlinear encoding in byte 2, and an 8-bit A component in byte 3.

* 
[VK_FORMAT_B8G8R8A8_UNORM](#) specifies a four-component, 32-bit
unsigned normalized format that has an 8-bit B component in byte 0, an
8-bit G component in byte 1, an 8-bit R component in byte 2, and an
8-bit A component in byte 3.

* 
[VK_FORMAT_B8G8R8A8_SNORM](#) specifies a four-component, 32-bit signed
normalized format that has an 8-bit B component in byte 0, an 8-bit G
component in byte 1, an 8-bit R component in byte 2, and an 8-bit A
component in byte 3.

* 
[VK_FORMAT_B8G8R8A8_USCALED](#) specifies a four-component, 32-bit
unsigned scaled format that has an 8-bit B component in byte 0, an 8-bit
G component in byte 1, an 8-bit R component in byte 2, and an 8-bit A
component in byte 3.

* 
[VK_FORMAT_B8G8R8A8_SSCALED](#) specifies a four-component, 32-bit
signed scaled format that has an 8-bit B component in byte 0, an 8-bit G
component in byte 1, an 8-bit R component in byte 2, and an 8-bit A
component in byte 3.

* 
[VK_FORMAT_B8G8R8A8_UINT](#) specifies a four-component, 32-bit
unsigned integer format that has an 8-bit B component in byte 0, an
8-bit G component in byte 1, an 8-bit R component in byte 2, and an
8-bit A component in byte 3.

* 
[VK_FORMAT_B8G8R8A8_SINT](#) specifies a four-component, 32-bit signed
integer format that has an 8-bit B component in byte 0, an 8-bit G
component in byte 1, an 8-bit R component in byte 2, and an 8-bit A
component in byte 3.

* 
[VK_FORMAT_B8G8R8A8_SRGB](#) specifies a four-component, 32-bit
unsigned normalized format that has an 8-bit B component stored with
sRGB nonlinear encoding in byte 0, an 8-bit G component stored with sRGB
nonlinear encoding in byte 1, an 8-bit R component stored with sRGB
nonlinear encoding in byte 2, and an 8-bit A component in byte 3.

* 
[VK_FORMAT_A8B8G8R8_UNORM_PACK32](#) specifies a four-component, 32-bit
packed unsigned normalized format that has an 8-bit A component in bits
24..31, an 8-bit B component in bits 16..23, an 8-bit G component in
bits 8..15, and an 8-bit R component in bits 0..7.

* 
[VK_FORMAT_A8B8G8R8_SNORM_PACK32](#) specifies a four-component, 32-bit
packed signed normalized format that has an 8-bit A component in bits
24..31, an 8-bit B component in bits 16..23, an 8-bit G component in
bits 8..15, and an 8-bit R component in bits 0..7.

* 
[VK_FORMAT_A8B8G8R8_USCALED_PACK32](#) specifies a four-component,
32-bit packed unsigned scaled integer format that has an 8-bit A
component in bits 24..31, an 8-bit B component in bits 16..23, an 8-bit
G component in bits 8..15, and an 8-bit R component in bits 0..7.

* 
[VK_FORMAT_A8B8G8R8_SSCALED_PACK32](#) specifies a four-component,
32-bit packed signed scaled integer format that has an 8-bit A component
in bits 24..31, an 8-bit B component in bits 16..23, an 8-bit G
component in bits 8..15, and an 8-bit R component in bits 0..7.

* 
[VK_FORMAT_A8B8G8R8_UINT_PACK32](#) specifies a four-component, 32-bit
packed unsigned integer format that has an 8-bit A component in bits
24..31, an 8-bit B component in bits 16..23, an 8-bit G component in
bits 8..15, and an 8-bit R component in bits 0..7.

* 
[VK_FORMAT_A8B8G8R8_SINT_PACK32](#) specifies a four-component, 32-bit
packed signed integer format that has an 8-bit A component in bits
24..31, an 8-bit B component in bits 16..23, an 8-bit G component in
bits 8..15, and an 8-bit R component in bits 0..7.

* 
[VK_FORMAT_A8B8G8R8_SRGB_PACK32](#) specifies a four-component, 32-bit
packed unsigned normalized format that has an 8-bit A component in bits
24..31, an 8-bit B component stored with sRGB nonlinear encoding in bits
16..23, an 8-bit G component stored with sRGB nonlinear encoding in bits
8..15, and an 8-bit R component stored with sRGB nonlinear encoding in
bits 0..7.

* 
[VK_FORMAT_A2R10G10B10_UNORM_PACK32](#) specifies a four-component,
32-bit packed unsigned normalized format that has a 2-bit A component in
bits 30..31, a 10-bit R component in bits 20..29, a 10-bit G component
in bits 10..19, and a 10-bit B component in bits 0..9.

* 
[VK_FORMAT_A2R10G10B10_SNORM_PACK32](#) specifies a four-component,
32-bit packed signed normalized format that has a 2-bit A component in
bits 30..31, a 10-bit R component in bits 20..29, a 10-bit G component
in bits 10..19, and a 10-bit B component in bits 0..9.

* 
[VK_FORMAT_A2R10G10B10_USCALED_PACK32](#) specifies a four-component,
32-bit packed unsigned scaled integer format that has a 2-bit A
component in bits 30..31, a 10-bit R component in bits 20..29, a 10-bit
G component in bits 10..19, and a 10-bit B component in bits 0..9.

* 
[VK_FORMAT_A2R10G10B10_SSCALED_PACK32](#) specifies a four-component,
32-bit packed signed scaled integer format that has a 2-bit A component
in bits 30..31, a 10-bit R component in bits 20..29, a 10-bit G
component in bits 10..19, and a 10-bit B component in bits 0..9.

* 
[VK_FORMAT_A2R10G10B10_UINT_PACK32](#) specifies a four-component,
32-bit packed unsigned integer format that has a 2-bit A component in
bits 30..31, a 10-bit R component in bits 20..29, a 10-bit G component
in bits 10..19, and a 10-bit B component in bits 0..9.

* 
[VK_FORMAT_A2R10G10B10_SINT_PACK32](#) specifies a four-component,
32-bit packed signed integer format that has a 2-bit A component in bits
30..31, a 10-bit R component in bits 20..29, a 10-bit G component in
bits 10..19, and a 10-bit B component in bits 0..9.

* 
[VK_FORMAT_A2B10G10R10_UNORM_PACK32](#) specifies a four-component,
32-bit packed unsigned normalized format that has a 2-bit A component in
bits 30..31, a 10-bit B component in bits 20..29, a 10-bit G component
in bits 10..19, and a 10-bit R component in bits 0..9.

* 
[VK_FORMAT_A2B10G10R10_SNORM_PACK32](#) specifies a four-component,
32-bit packed signed normalized format that has a 2-bit A component in
bits 30..31, a 10-bit B component in bits 20..29, a 10-bit G component
in bits 10..19, and a 10-bit R component in bits 0..9.

* 
[VK_FORMAT_A2B10G10R10_USCALED_PACK32](#) specifies a four-component,
32-bit packed unsigned scaled integer format that has a 2-bit A
component in bits 30..31, a 10-bit B component in bits 20..29, a 10-bit
G component in bits 10..19, and a 10-bit R component in bits 0..9.

* 
[VK_FORMAT_A2B10G10R10_SSCALED_PACK32](#) specifies a four-component,
32-bit packed signed scaled integer format that has a 2-bit A component
in bits 30..31, a 10-bit B component in bits 20..29, a 10-bit G
component in bits 10..19, and a 10-bit R component in bits 0..9.

* 
[VK_FORMAT_A2B10G10R10_UINT_PACK32](#) specifies a four-component,
32-bit packed unsigned integer format that has a 2-bit A component in
bits 30..31, a 10-bit B component in bits 20..29, a 10-bit G component
in bits 10..19, and a 10-bit R component in bits 0..9.

* 
[VK_FORMAT_A2B10G10R10_SINT_PACK32](#) specifies a four-component,
32-bit packed signed integer format that has a 2-bit A component in bits
30..31, a 10-bit B component in bits 20..29, a 10-bit G component in
bits 10..19, and a 10-bit R component in bits 0..9.

* 
[VK_FORMAT_R16_UNORM](#) specifies a one-component, 16-bit unsigned
normalized format that has a single 16-bit R component.

* 
[VK_FORMAT_R16_SNORM](#) specifies a one-component, 16-bit signed
normalized format that has a single 16-bit R component.

* 
[VK_FORMAT_R16_USCALED](#) specifies a one-component, 16-bit unsigned
scaled integer format that has a single 16-bit R component.

* 
[VK_FORMAT_R16_SSCALED](#) specifies a one-component, 16-bit signed
scaled integer format that has a single 16-bit R component.

* 
[VK_FORMAT_R16_UINT](#) specifies a one-component, 16-bit unsigned
integer format that has a single 16-bit R component.

* 
[VK_FORMAT_R16_SINT](#) specifies a one-component, 16-bit signed
integer format that has a single 16-bit R component.

* 
[VK_FORMAT_R16_SFLOAT](#) specifies a one-component, 16-bit signed
floating-point format that has a single 16-bit R component.

* 
[VK_FORMAT_R16G16_UNORM](#) specifies a two-component, 32-bit unsigned
normalized format that has a 16-bit R component in bytes 0..1, and a
16-bit G component in bytes 2..3.

* 
[VK_FORMAT_R16G16_SNORM](#) specifies a two-component, 32-bit signed
normalized format that has a 16-bit R component in bytes 0..1, and a
16-bit G component in bytes 2..3.

* 
[VK_FORMAT_R16G16_USCALED](#) specifies a two-component, 32-bit
unsigned scaled integer format that has a 16-bit R component in bytes
0..1, and a 16-bit G component in bytes 2..3.

* 
[VK_FORMAT_R16G16_SSCALED](#) specifies a two-component, 32-bit signed
scaled integer format that has a 16-bit R component in bytes 0..1, and a
16-bit G component in bytes 2..3.

* 
[VK_FORMAT_R16G16_UINT](#) specifies a two-component, 32-bit unsigned
integer format that has a 16-bit R component in bytes 0..1, and a 16-bit
G component in bytes 2..3.

* 
[VK_FORMAT_R16G16_SINT](#) specifies a two-component, 32-bit signed
integer format that has a 16-bit R component in bytes 0..1, and a 16-bit
G component in bytes 2..3.

* 
[VK_FORMAT_R16G16_SFLOAT](#) specifies a two-component, 32-bit signed
floating-point format that has a 16-bit R component in bytes 0..1, and a
16-bit G component in bytes 2..3.

* 
[VK_FORMAT_R16G16B16_UNORM](#) specifies a three-component, 48-bit
unsigned normalized format that has a 16-bit R component in bytes 0..1,
a 16-bit G component in bytes 2..3, and a 16-bit B component in bytes
4..5.

* 
[VK_FORMAT_R16G16B16_SNORM](#) specifies a three-component, 48-bit
signed normalized format that has a 16-bit R component in bytes 0..1, a
16-bit G component in bytes 2..3, and a 16-bit B component in bytes
4..5.

* 
[VK_FORMAT_R16G16B16_USCALED](#) specifies a three-component, 48-bit
unsigned scaled integer format that has a 16-bit R component in bytes
0..1, a 16-bit G component in bytes 2..3, and a 16-bit B component in
bytes 4..5.

* 
[VK_FORMAT_R16G16B16_SSCALED](#) specifies a three-component, 48-bit
signed scaled integer format that has a 16-bit R component in bytes
0..1, a 16-bit G component in bytes 2..3, and a 16-bit B component in
bytes 4..5.

* 
[VK_FORMAT_R16G16B16_UINT](#) specifies a three-component, 48-bit
unsigned integer format that has a 16-bit R component in bytes 0..1, a
16-bit G component in bytes 2..3, and a 16-bit B component in bytes
4..5.

* 
[VK_FORMAT_R16G16B16_SINT](#) specifies a three-component, 48-bit
signed integer format that has a 16-bit R component in bytes 0..1, a
16-bit G component in bytes 2..3, and a 16-bit B component in bytes
4..5.

* 
[VK_FORMAT_R16G16B16_SFLOAT](#) specifies a three-component, 48-bit
signed floating-point format that has a 16-bit R component in bytes
0..1, a 16-bit G component in bytes 2..3, and a 16-bit B component in
bytes 4..5.

* 
[VK_FORMAT_R16G16B16A16_UNORM](#) specifies a four-component, 64-bit
unsigned normalized format that has a 16-bit R component in bytes 0..1,
a 16-bit G component in bytes 2..3, a 16-bit B component in bytes 4..5,
and a 16-bit A component in bytes 6..7.

* 
[VK_FORMAT_R16G16B16A16_SNORM](#) specifies a four-component, 64-bit
signed normalized format that has a 16-bit R component in bytes 0..1, a
16-bit G component in bytes 2..3, a 16-bit B component in bytes 4..5,
and a 16-bit A component in bytes 6..7.

* 
[VK_FORMAT_R16G16B16A16_USCALED](#) specifies a four-component, 64-bit
unsigned scaled integer format that has a 16-bit R component in bytes
0..1, a 16-bit G component in bytes 2..3, a 16-bit B component in bytes
4..5, and a 16-bit A component in bytes 6..7.

* 
[VK_FORMAT_R16G16B16A16_SSCALED](#) specifies a four-component, 64-bit
signed scaled integer format that has a 16-bit R component in bytes
0..1, a 16-bit G component in bytes 2..3, a 16-bit B component in bytes
4..5, and a 16-bit A component in bytes 6..7.

* 
[VK_FORMAT_R16G16B16A16_UINT](#) specifies a four-component, 64-bit
unsigned integer format that has a 16-bit R component in bytes 0..1, a
16-bit G component in bytes 2..3, a 16-bit B component in bytes 4..5,
and a 16-bit A component in bytes 6..7.

* 
[VK_FORMAT_R16G16B16A16_SINT](#) specifies a four-component, 64-bit
signed integer format that has a 16-bit R component in bytes 0..1, a
16-bit G component in bytes 2..3, a 16-bit B component in bytes 4..5,
and a 16-bit A component in bytes 6..7.

* 
[VK_FORMAT_R16G16B16A16_SFLOAT](#) specifies a four-component, 64-bit
signed floating-point format that has a 16-bit R component in bytes
0..1, a 16-bit G component in bytes 2..3, a 16-bit B component in bytes
4..5, and a 16-bit A component in bytes 6..7.

* 
[VK_FORMAT_R32_UINT](#) specifies a one-component, 32-bit unsigned
integer format that has a single 32-bit R component.

* 
[VK_FORMAT_R32_SINT](#) specifies a one-component, 32-bit signed
integer format that has a single 32-bit R component.

* 
[VK_FORMAT_R32_SFLOAT](#) specifies a one-component, 32-bit signed
floating-point format that has a single 32-bit R component.

* 
[VK_FORMAT_R32G32_UINT](#) specifies a two-component, 64-bit unsigned
integer format that has a 32-bit R component in bytes 0..3, and a 32-bit
G component in bytes 4..7.

* 
[VK_FORMAT_R32G32_SINT](#) specifies a two-component, 64-bit signed
integer format that has a 32-bit R component in bytes 0..3, and a 32-bit
G component in bytes 4..7.

* 
[VK_FORMAT_R32G32_SFLOAT](#) specifies a two-component, 64-bit signed
floating-point format that has a 32-bit R component in bytes 0..3, and a
32-bit G component in bytes 4..7.

* 
[VK_FORMAT_R32G32B32_UINT](#) specifies a three-component, 96-bit
unsigned integer format that has a 32-bit R component in bytes 0..3, a
32-bit G component in bytes 4..7, and a 32-bit B component in bytes
8..11.

* 
[VK_FORMAT_R32G32B32_SINT](#) specifies a three-component, 96-bit
signed integer format that has a 32-bit R component in bytes 0..3, a
32-bit G component in bytes 4..7, and a 32-bit B component in bytes
8..11.

* 
[VK_FORMAT_R32G32B32_SFLOAT](#) specifies a three-component, 96-bit
signed floating-point format that has a 32-bit R component in bytes
0..3, a 32-bit G component in bytes 4..7, and a 32-bit B component in
bytes 8..11.

* 
[VK_FORMAT_R32G32B32A32_UINT](#) specifies a four-component, 128-bit
unsigned integer format that has a 32-bit R component in bytes 0..3, a
32-bit G component in bytes 4..7, a 32-bit B component in bytes 8..11,
and a 32-bit A component in bytes 12..15.

* 
[VK_FORMAT_R32G32B32A32_SINT](#) specifies a four-component, 128-bit
signed integer format that has a 32-bit R component in bytes 0..3, a
32-bit G component in bytes 4..7, a 32-bit B component in bytes 8..11,
and a 32-bit A component in bytes 12..15.

* 
[VK_FORMAT_R32G32B32A32_SFLOAT](#) specifies a four-component, 128-bit
signed floating-point format that has a 32-bit R component in bytes
0..3, a 32-bit G component in bytes 4..7, a 32-bit B component in bytes
8..11, and a 32-bit A component in bytes 12..15.

* 
[VK_FORMAT_R64_UINT](#) specifies a one-component, 64-bit unsigned
integer format that has a single 64-bit R component.

* 
[VK_FORMAT_R64_SINT](#) specifies a one-component, 64-bit signed
integer format that has a single 64-bit R component.

* 
[VK_FORMAT_R64_SFLOAT](#) specifies a one-component, 64-bit signed
floating-point format that has a single 64-bit R component.

* 
[VK_FORMAT_R64G64_UINT](#) specifies a two-component, 128-bit unsigned
integer format that has a 64-bit R component in bytes 0..7, and a 64-bit
G component in bytes 8..15.

* 
[VK_FORMAT_R64G64_SINT](#) specifies a two-component, 128-bit signed
integer format that has a 64-bit R component in bytes 0..7, and a 64-bit
G component in bytes 8..15.

* 
[VK_FORMAT_R64G64_SFLOAT](#) specifies a two-component, 128-bit signed
floating-point format that has a 64-bit R component in bytes 0..7, and a
64-bit G component in bytes 8..15.

* 
[VK_FORMAT_R64G64B64_UINT](#) specifies a three-component, 192-bit
unsigned integer format that has a 64-bit R component in bytes 0..7, a
64-bit G component in bytes 8..15, and a 64-bit B component in bytes
16..23.

* 
[VK_FORMAT_R64G64B64_SINT](#) specifies a three-component, 192-bit
signed integer format that has a 64-bit R component in bytes 0..7, a
64-bit G component in bytes 8..15, and a 64-bit B component in bytes
16..23.

* 
[VK_FORMAT_R64G64B64_SFLOAT](#) specifies a three-component, 192-bit
signed floating-point format that has a 64-bit R component in bytes
0..7, a 64-bit G component in bytes 8..15, and a 64-bit B component in
bytes 16..23.

* 
[VK_FORMAT_R64G64B64A64_UINT](#) specifies a four-component, 256-bit
unsigned integer format that has a 64-bit R component in bytes 0..7, a
64-bit G component in bytes 8..15, a 64-bit B component in bytes 16..23,
and a 64-bit A component in bytes 24..31.

* 
[VK_FORMAT_R64G64B64A64_SINT](#) specifies a four-component, 256-bit
signed integer format that has a 64-bit R component in bytes 0..7, a
64-bit G component in bytes 8..15, a 64-bit B component in bytes 16..23,
and a 64-bit A component in bytes 24..31.

* 
[VK_FORMAT_R64G64B64A64_SFLOAT](#) specifies a four-component, 256-bit
signed floating-point format that has a 64-bit R component in bytes
0..7, a 64-bit G component in bytes 8..15, a 64-bit B component in bytes
16..23, and a 64-bit A component in bytes 24..31.

* 
[VK_FORMAT_B10G11R11_UFLOAT_PACK32](#) specifies a three-component,
32-bit packed unsigned floating-point format that has a 10-bit B
component in bits 22..31, an 11-bit G component in bits 11..21, an
11-bit R component in bits 0..10.
See [Unsigned 10-Bit Floating-Point Numbers](../../../../spec/latest/chapters/fundamentals.html#fundamentals-fp10) and [Unsigned 11-Bit Floating-Point Numbers](../../../../spec/latest/chapters/fundamentals.html#fundamentals-fp11).

* 
[VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](#) specifies a three-component,
32-bit packed unsigned floating-point format that has a 5-bit shared
exponent in bits 27..31, a 9-bit B component mantissa in bits 18..26, a
9-bit G component mantissa in bits 9..17, and a 9-bit R component
mantissa in bits 0..8.

* 
[VK_FORMAT_D16_UNORM](#) specifies a one-component, 16-bit unsigned
normalized format that has a single 16-bit depth component.

* 
[VK_FORMAT_X8_D24_UNORM_PACK32](#) specifies a two-component, 32-bit
format that has 24 unsigned normalized bits in the depth component and,
**optionally**, 8 bits that are unused.

* 
[VK_FORMAT_D32_SFLOAT](#) specifies a one-component, 32-bit signed
floating-point format that has 32 bits in the depth component.

* 
[VK_FORMAT_S8_UINT](#) specifies a one-component, 8-bit unsigned
integer format that has 8 bits in the stencil component.

* 
[VK_FORMAT_D16_UNORM_S8_UINT](#) specifies a two-component, 24-bit
format that has 16 unsigned normalized bits in the depth component and 8
unsigned integer bits in the stencil component.

* 
[VK_FORMAT_D24_UNORM_S8_UINT](#) specifies a two-component, 32-bit
packed format that has 8 unsigned integer bits in the stencil component,
and 24 unsigned normalized bits in the depth component.

* 
[VK_FORMAT_D32_SFLOAT_S8_UINT](#) specifies a two-component format that
has 32 signed float bits in the depth component and 8 unsigned integer
bits in the stencil component.
There are **optionally** 24 bits that are unused.

* 
[VK_FORMAT_BC1_RGB_UNORM_BLOCK](#) specifies a three-component,
block-compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGB texel data.
This format has no alpha and is considered opaque.

* 
[VK_FORMAT_BC1_RGB_SRGB_BLOCK](#) specifies a three-component,
block-compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGB texel data with sRGB
nonlinear encoding.
This format has no alpha and is considered opaque.

* 
[VK_FORMAT_BC1_RGBA_UNORM_BLOCK](#) specifies a four-component,
block-compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGB texel data, and
provides 1 bit of alpha.

* 
[VK_FORMAT_BC1_RGBA_SRGB_BLOCK](#) specifies a four-component,
block-compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGB texel data with sRGB
nonlinear encoding, and provides 1 bit of alpha.

* 
[VK_FORMAT_BC2_UNORM_BLOCK](#) specifies a four-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of unsigned normalized RGBA texel data
with the first 64 bits encoding alpha values followed by 64 bits
encoding RGB values.

* 
[VK_FORMAT_BC2_SRGB_BLOCK](#) specifies a four-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of unsigned normalized RGBA texel data
with the first 64 bits encoding alpha values followed by 64 bits
encoding RGB values with sRGB nonlinear encoding.

* 
[VK_FORMAT_BC3_UNORM_BLOCK](#) specifies a four-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of unsigned normalized RGBA texel data
with the first 64 bits encoding alpha values followed by 64 bits
encoding RGB values.

* 
[VK_FORMAT_BC3_SRGB_BLOCK](#) specifies a four-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of unsigned normalized RGBA texel data
with the first 64 bits encoding alpha values followed by 64 bits
encoding RGB values with sRGB nonlinear encoding.

* 
[VK_FORMAT_BC4_UNORM_BLOCK](#) specifies a one-component,
block-compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized red texel data.

* 
[VK_FORMAT_BC4_SNORM_BLOCK](#) specifies a one-component,
block-compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of signed normalized red texel data.

* 
[VK_FORMAT_BC5_UNORM_BLOCK](#) specifies a two-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of unsigned normalized RG texel data with
the first 64 bits encoding red values followed by 64 bits encoding green
values.

* 
[VK_FORMAT_BC5_SNORM_BLOCK](#) specifies a two-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of signed normalized RG texel data with
the first 64 bits encoding red values followed by 64 bits encoding green
values.

* 
[VK_FORMAT_BC6H_UFLOAT_BLOCK](#) specifies a three-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of unsigned floating-point RGB texel data.

* 
[VK_FORMAT_BC6H_SFLOAT_BLOCK](#) specifies a three-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of signed floating-point RGB texel data.

* 
[VK_FORMAT_BC7_UNORM_BLOCK](#) specifies a four-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_BC7_SRGB_BLOCK](#) specifies a four-component,
block-compressed format where each 128-bit compressed texel block
encodes a 4×4 rectangle of unsigned normalized RGBA texel data
with sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ETC2_R8G8B8_UNORM_BLOCK](#) specifies a three-component,
ETC2 compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGB texel data.
This format has no alpha and is considered opaque.

* 
[VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK](#) specifies a three-component, ETC2
compressed format where each 64-bit compressed texel block encodes a
4×4 rectangle of unsigned normalized RGB texel data with sRGB
nonlinear encoding.
This format has no alpha and is considered opaque.

* 
[VK_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK](#) specifies a four-component,
ETC2 compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGB texel data, and
provides 1 bit of alpha.

* 
[VK_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK](#) specifies a four-component,
ETC2 compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGB texel data with sRGB
nonlinear encoding, and provides 1 bit of alpha.

* 
[VK_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK](#) specifies a four-component,
ETC2 compressed format where each 128-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGBA texel data with the
first 64 bits encoding alpha values followed by 64 bits encoding RGB
values.

* 
[VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK](#) specifies a four-component,
ETC2 compressed format where each 128-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGBA texel data with the
first 64 bits encoding alpha values followed by 64 bits encoding RGB
values with sRGB nonlinear encoding applied.

* 
[VK_FORMAT_EAC_R11_UNORM_BLOCK](#) specifies a one-component, ETC2
compressed format where each 64-bit compressed texel block encodes a
4×4 rectangle of unsigned normalized red texel data.

* 
[VK_FORMAT_EAC_R11_SNORM_BLOCK](#) specifies a one-component, ETC2
compressed format where each 64-bit compressed texel block encodes a
4×4 rectangle of signed normalized red texel data.

* 
[VK_FORMAT_EAC_R11G11_UNORM_BLOCK](#) specifies a two-component, ETC2
compressed format where each 128-bit compressed texel block encodes a
4×4 rectangle of unsigned normalized RG texel data with the first
64 bits encoding red values followed by 64 bits encoding green values.

* 
[VK_FORMAT_EAC_R11G11_SNORM_BLOCK](#) specifies a two-component, ETC2
compressed format where each 128-bit compressed texel block encodes a
4×4 rectangle of signed normalized RG texel data with the first 64
bits encoding red values followed by 64 bits encoding green values.

* 
[VK_FORMAT_ASTC_4x4_UNORM_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
4×4 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_4x4_SRGB_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
4×4 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
4×4 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_5x4_UNORM_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
5×4 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_5x4_SRGB_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
5×4 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
5×4 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_5x5_UNORM_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
5×5 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_5x5_SRGB_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
5×5 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
5×5 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_6x5_UNORM_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
6×5 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_6x5_SRGB_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
6×5 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
6×5 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_6x6_UNORM_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
6×6 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_6x6_SRGB_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
6×6 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
6×6 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_8x5_UNORM_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes an
8×5 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_8x5_SRGB_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes an
8×5 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
8×5 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_8x6_UNORM_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes an
8×6 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_8x6_SRGB_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes an
8×6 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
8×6 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_8x8_UNORM_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes an
8×8 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_8x8_SRGB_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes an
8×8 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
8×8 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_10x5_UNORM_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×5 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_10x5_SRGB_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×5 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×5 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_10x6_UNORM_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×6 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_10x6_SRGB_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×6 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×6 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_10x8_UNORM_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×8 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_10x8_SRGB_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×8 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×8 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_10x10_UNORM_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×10 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_10x10_SRGB_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×10 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
10×10 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_12x10_UNORM_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
12×10 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_12x10_SRGB_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
12×10 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
12×10 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_12x12_UNORM_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
12×12 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_12x12_SRGB_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
12×12 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK](#) specifies a four-component, ASTC
compressed format where each 128-bit compressed texel block encodes a
12×12 rectangle of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_3x3x3_UNORM_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 3×3×3 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_3x3x3_SRGB_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 3×3×3 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_3x3x3_SFLOAT_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 3×3×3 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_4x3x3_UNORM_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×3×3 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_4x3x3_SRGB_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×3×3 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_4x3x3_SFLOAT_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×3×3 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_4x4x3_UNORM_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×4×3 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_4x4x3_SRGB_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×4×3 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_4x4x3_SFLOAT_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×4×3 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_4x4x4_UNORM_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×4×4 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_4x4x4_SRGB_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×4×4 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_4x4x4_SFLOAT_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 4×4×4 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_5x4x4_UNORM_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×4×4 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_5x4x4_SRGB_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×4×4 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_5x4x4_SFLOAT_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×4×4 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_5x5x4_UNORM_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×5×4 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_5x5x4_SRGB_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×5×4 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_5x5x4_SFLOAT_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×5×4 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_5x5x5_UNORM_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×5×5 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_5x5x5_SRGB_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×5×5 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_5x5x5_SFLOAT_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 5×5×5 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_6x5x5_UNORM_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×5×5 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_6x5x5_SRGB_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×5×5 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_6x5x5_SFLOAT_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×5×5 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_6x6x5_UNORM_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×6×5 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_6x6x5_SRGB_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×6×5 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_6x6x5_SFLOAT_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×6×5 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_ASTC_6x6x6_UNORM_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×6×6 cuboid of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_ASTC_6x6x6_SRGB_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×6×6 cuboid of unsigned normalized RGBA texel data with
sRGB nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_ASTC_6x6x6_SFLOAT_BLOCK_EXT](#) specifies a four-component,
ASTC compressed format where each 128-bit compressed texel block encodes
a 6×6×6 cuboid of signed floating-point RGBA texel data.

* 
[VK_FORMAT_G8B8G8R8_422_UNORM](#) specifies a four-component, 32-bit
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
[VK_FORMAT_B8G8R8G8_422_UNORM](#) specifies a four-component, 32-bit
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
[VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM](#) specifies an unsigned
normalized *multi-planar format* that has an 8-bit G component in plane
0, an 8-bit B component in plane 1, and an 8-bit R component in plane 2.
The horizontal and vertical dimensions of the R and B planes are halved
relative to the image dimensions, and each R and B component is shared
with the G components for which \(\left\lfloor i_G \times 0.5
\right\rfloor = i_B = i_R\) and \(\left\lfloor j_G \times 0.5
\right\rfloor = j_B = j_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html) for the R plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G8_B8R8_2PLANE_420_UNORM](#) specifies an unsigned
normalized *multi-planar format* that has an 8-bit G component in plane
0, and a two-component, 16-bit BR plane 1 consisting of an 8-bit B
component in byte 0 and an 8-bit R component in byte 1.
The horizontal and vertical dimensions of the BR plane are halved
relative to the image dimensions, and each R and B value is shared with
the G components for which \(\left\lfloor i_G \times 0.5
\right\rfloor = i_B = i_R\) and \(\left\lfloor j_G \times 0.5
\right\rfloor = j_B = j_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the BR plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G8_B8_R8_3PLANE_422_UNORM](#) specifies an unsigned
normalized *multi-planar format* that has an 8-bit G component in plane
0, an 8-bit B component in plane 1, and an 8-bit R component in plane 2.
The horizontal dimension of the R and B plane is halved relative to the
image dimensions, and each R and B value is shared with the G components
for which \(\left\lfloor i_G \times 0.5 \right\rfloor = i_B =
i_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html) for the R plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_G8_B8R8_2PLANE_422_UNORM](#) specifies an unsigned
normalized *multi-planar format* that has an 8-bit G component in plane
0, and a two-component, 16-bit BR plane 1 consisting of an 8-bit B
component in byte 0 and an 8-bit R component in byte 1.
The horizontal dimension of the BR plane is halved relative to the image
dimensions, and each R and B value is shared with the G components for
which   .
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the BR plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_G8_B8_R8_3PLANE_444_UNORM](#) specifies an unsigned
normalized *multi-planar format* that has an 8-bit G component in plane
0, an 8-bit B component in plane 1, and an 8-bit R component in plane 2.
Each plane has the same dimensions and each R, G, and B component
contributes to a single texel.
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html) for the R plane.

* 
[VK_FORMAT_R10X6_UNORM_PACK16](#) specifies a one-component, 16-bit
unsigned normalized format that has a single 10-bit R component in the
top 10 bits of a 16-bit word, with the bottom 6 bits unused.

* 
[VK_FORMAT_R10X6G10X6_UNORM_2PACK16](#) specifies a two-component,
32-bit unsigned normalized format that has a 10-bit R component in the
top 10 bits of the word in bytes 0..1, and a 10-bit G component in the
top 10 bits of the word in bytes 2..3, with the bottom 6 bits of each
word unused.

* 
[VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16](#) specifies a
four-component, 64-bit unsigned normalized format that has a 10-bit R
component in the top 10 bits of the word in bytes 0..1, a 10-bit G
component in the top 10 bits of the word in bytes 2..3, a 10-bit B
component in the top 10 bits of the word in bytes 4..5, and a 10-bit A
component in the top 10 bits of the word in bytes 6..7, with the bottom
6 bits of each word unused.

* 
[VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16](#) specifies a
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
[VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16](#) specifies a
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
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16](#) specifies an
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
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html) for the R plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16](#) specifies an
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
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the BR plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16](#) specifies an
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
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html) for the R plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16](#) specifies an
unsigned normalized *multi-planar format* that has a 10-bit G component
in the top 10 bits of each 16-bit word of plane 0, and a two-component,
32-bit BR plane 1 consisting of a 10-bit B component in the top 10 bits
of the word in bytes 0..1, and a 10-bit R component in the top 10 bits
of the word in bytes 2..3, with the bottom 6 bits of each word unused.
The horizontal dimension of the BR plane is halved relative to the image
dimensions, and each R and B value is shared with the G components for
which   .
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the BR plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16](#) specifies an
unsigned normalized *multi-planar format* that has a 10-bit G component
in the top 10 bits of each 16-bit word of plane 0, a 10-bit B component
in the top 10 bits of each 16-bit word of plane 1, and a 10-bit R
component in the top 10 bits of each 16-bit word of plane 2, with the
bottom 6 bits of each word unused.
Each plane has the same dimensions and each R, G, and B component
contributes to a single texel.
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html) for the R plane.

* 
[VK_FORMAT_R12X4_UNORM_PACK16](#) specifies a one-component, 16-bit
unsigned normalized format that has a single 12-bit R component in the
top 12 bits of a 16-bit word, with the bottom 4 bits unused.

* 
[VK_FORMAT_R12X4G12X4_UNORM_2PACK16](#) specifies a two-component,
32-bit unsigned normalized format that has a 12-bit R component in the
top 12 bits of the word in bytes 0..1, and a 12-bit G component in the
top 12 bits of the word in bytes 2..3, with the bottom 4 bits of each
word unused.

* 
[VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16](#) specifies a
four-component, 64-bit unsigned normalized format that has a 12-bit R
component in the top 12 bits of the word in bytes 0..1, a 12-bit G
component in the top 12 bits of the word in bytes 2..3, a 12-bit B
component in the top 12 bits of the word in bytes 4..5, and a 12-bit A
component in the top 12 bits of the word in bytes 6..7, with the bottom
4 bits of each word unused.

* 
[VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16](#) specifies a
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
[VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16](#) specifies a
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
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16](#) specifies an
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
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html) for the R plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16](#) specifies an
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
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the BR plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16](#) specifies an
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
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html) for the R plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16](#) specifies an
unsigned normalized *multi-planar format* that has a 12-bit G component
in the top 12 bits of each 16-bit word of plane 0, and a two-component,
32-bit BR plane 1 consisting of a 12-bit B component in the top 12 bits
of the word in bytes 0..1, and a 12-bit R component in the top 12 bits
of the word in bytes 2..3, with the bottom 4 bits of each word unused.
The horizontal dimension of the BR plane is halved relative to the image
dimensions, and each R and B value is shared with the G components for
which   .
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the BR plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16](#) specifies an
unsigned normalized *multi-planar format* that has a 12-bit G component
in the top 12 bits of each 16-bit word of plane 0, a 12-bit B component
in the top 12 bits of each 16-bit word of plane 1, and a 12-bit R
component in the top 12 bits of each 16-bit word of plane 2, with the
bottom 4 bits of each word unused.
Each plane has the same dimensions and each R, G, and B component
contributes to a single texel.
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html) for the R plane.

* 
[VK_FORMAT_G16B16G16R16_422_UNORM](#) specifies a four-component,
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
[VK_FORMAT_B16G16R16G16_422_UNORM](#) specifies a four-component,
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
[VK_FORMAT_G16_B16_R16_3PLANE_420_UNORM](#) specifies an unsigned
normalized *multi-planar format* that has a 16-bit G component in each
16-bit word of plane 0, a 16-bit B component in each 16-bit word of
plane 1, and a 16-bit R component in each 16-bit word of plane 2.
The horizontal and vertical dimensions of the R and B planes are halved
relative to the image dimensions, and each R and B component is shared
with the G components for which \(\left\lfloor i_G \times 0.5
\right\rfloor = i_B = i_R\) and \(\left\lfloor j_G \times 0.5
\right\rfloor = j_B = j_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html) for the R plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G16_B16R16_2PLANE_420_UNORM](#) specifies an unsigned
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
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the BR plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G16_B16_R16_3PLANE_422_UNORM](#) specifies an unsigned
normalized *multi-planar format* that has a 16-bit G component in each
16-bit word of plane 0, a 16-bit B component in each 16-bit word of
plane 1, and a 16-bit R component in each 16-bit word of plane 2.
The horizontal dimension of the R and B plane is halved relative to the
image dimensions, and each R and B value is shared with the G components
for which \(\left\lfloor i_G \times 0.5 \right\rfloor = i_B =
i_R\).
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html) for the R plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_G16_B16R16_2PLANE_422_UNORM](#) specifies an unsigned
normalized *multi-planar format* that has a 16-bit G component in each
16-bit word of plane 0, and a two-component, 32-bit BR plane 1
consisting of a 16-bit B component in the word in bytes 0..1, and a
16-bit R component in the word in bytes 2..3.
The horizontal dimension of the BR plane is halved relative to the image
dimensions, and each R and B value is shared with the G components for
which   .
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the BR plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_G16_B16_R16_3PLANE_444_UNORM](#) specifies an unsigned
normalized *multi-planar format* that has a 16-bit G component in each
16-bit word of plane 0, a 16-bit B component in each 16-bit word of
plane 1, and a 16-bit R component in each 16-bit word of plane 2.
Each plane has the same dimensions and each R, G, and B component
contributes to a single texel.
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane,
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the B plane, and
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html) for the R plane.

* 
[VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](#) specifies an unsigned
normalized *multi-planar format* that has an 8-bit G component in plane
0, and a two-component, 16-bit BR plane 1 consisting of an 8-bit B
component in byte 0 and an 8-bit R component in byte 1.
Both planes have the same dimensions and each R, G, and B component
contributes to a single texel.
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the BR plane.

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](#) specifies an
unsigned normalized *multi-planar format* that has a 10-bit G component
in the top 10 bits of each 16-bit word of plane 0, and a two-component,
32-bit BR plane 1 consisting of a 10-bit B component in the top 10 bits
of the word in bytes 0..1, and a 10-bit R component in the top 10 bits
of the word in bytes 2..3, the bottom 6 bits of each word unused.
Both planes have the same dimensions and each R, G, and B component
contributes to a single texel.
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the BR plane.

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](#) specifies an
unsigned normalized *multi-planar format* that has a 12-bit G component
in the top 12 bits of each 16-bit word of plane 0, and a two-component,
32-bit BR plane 1 consisting of a 12-bit B component in the top 12 bits
of the word in bytes 0..1, and a 12-bit R component in the top 12 bits
of the word in bytes 2..3, the bottom 4 bits of each word unused.
Both planes have the same dimensions and each R, G, and B component
contributes to a single texel.
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the BR plane.

* 
[VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](#) specifies an unsigned
normalized *multi-planar format* that has a 16-bit G component in each
16-bit word of plane 0, and a two-component, 32-bit BR plane 1
consisting of a 16-bit B component in the word in bytes 0..1, and a
16-bit R component in the word in bytes 2..3.
Both planes have the same dimensions and each R, G, and B component
contributes to a single texel.
The location of each plane when this image is in linear layout can be
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the BR plane.

* 
[VK_FORMAT_PVRTC1_2BPP_UNORM_BLOCK_IMG](#) specifies a four-component,
PVRTC compressed format where each 64-bit compressed texel block encodes
an 8×4 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_PVRTC1_4BPP_UNORM_BLOCK_IMG](#) specifies a four-component,
PVRTC compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_PVRTC2_2BPP_UNORM_BLOCK_IMG](#) specifies a four-component,
PVRTC compressed format where each 64-bit compressed texel block encodes
an 8×4 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_PVRTC2_4BPP_UNORM_BLOCK_IMG](#) specifies a four-component,
PVRTC compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGBA texel data.

* 
[VK_FORMAT_PVRTC1_2BPP_SRGB_BLOCK_IMG](#) specifies a four-component,
PVRTC compressed format where each 64-bit compressed texel block encodes
an 8×4 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_PVRTC1_4BPP_SRGB_BLOCK_IMG](#) specifies a four-component,
PVRTC compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_PVRTC2_2BPP_SRGB_BLOCK_IMG](#) specifies a four-component,
PVRTC compressed format where each 64-bit compressed texel block encodes
an 8×4 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_PVRTC2_4BPP_SRGB_BLOCK_IMG](#) specifies a four-component,
PVRTC compressed format where each 64-bit compressed texel block encodes
a 4×4 rectangle of unsigned normalized RGBA texel data with sRGB
nonlinear encoding applied to the RGB components.

* 
[VK_FORMAT_R16G16_SFIXED5_NV](#) specifies a two-component, 16-bit
signed fixed-point format with linear encoding.
The components are signed two’s-complement integers where the most
significant bit specifies the sign bit, the next 10 bits specify the
integer value, and the last 5 bits represent the fractional value.
The signed 16-bit values **can** be converted to floats in the range
[-1024,1023.96875] by dividing the value by 32 (25).

* 
[VK_FORMAT_R10X6_UINT_PACK16_ARM](#) specifies a one-component, 16-bit
unsigned integer format that has a single 10-bit R component in the top
10 bits of a 16-bit word, with the bottom 6 bits unused.

* 
[VK_FORMAT_R10X6G10X6_UINT_2PACK16_ARM](#) specifies a two-component,
32-bit unsigned integer format that has a 10-bit R component in the top
10 bits of the word in bytes 0..1, and a 10-bit G component in the top
10 bits of the word in bytes 2..3, with the bottom 6 bits of each word
unused.

* 
[VK_FORMAT_R10X6G10X6B10X6A10X6_UINT_4PACK16_ARM](#) specifies a
four-component, 64-bit unsigned integer format that has a 10-bit R
component in the top 10 bits of the word in bytes 0..1, a 10-bit G
component in the top 10 bits of the word in bytes 2..3, a 10-bit B
component in the top 10 bits of the word in bytes 4..5, and a 10-bit A
component in the top 10 bits of the word in bytes 6..7, with the bottom
6 bits of each word unused.

* 
[VK_FORMAT_R12X4_UINT_PACK16_ARM](#) specifies a one-component, 16-bit
unsigned integer format that has a single 12-bit R component in the top
12 bits of a 16-bit word, with the bottom 4 bits unused.

* 
[VK_FORMAT_R12X4G12X4_UINT_2PACK16_ARM](#) specifies a two-component,
32-bit unsigned integer format that has a 12-bit R component in the top
12 bits of the word in bytes 0..1, and a 12-bit G component in the top
12 bits of the word in bytes 2..3, with the bottom 4 bits of each word
unused.

* 
[VK_FORMAT_R12X4G12X4B12X4A12X4_UINT_4PACK16_ARM](#) specifies a
four-component, 64-bit unsigned integer format that has a 12-bit R
component in the top 12 bits of the word in bytes 0..1, a 12-bit G
component in the top 12 bits of the word in bytes 2..3, a 12-bit B
component in the top 12 bits of the word in bytes 4..5, and a 12-bit A
component in the top 12 bits of the word in bytes 6..7, with the bottom
4 bits of each word unused.

* 
[VK_FORMAT_R14X2_UINT_PACK16_ARM](#) specifies a one-component, 16-bit
unsigned integer format that has a single 14-bit R component in the top
14 bits of a 16-bit word, with the bottom 2 bits unused.

* 
[VK_FORMAT_R14X2G14X2_UINT_2PACK16_ARM](#) specifies a two-component,
32-bit unsigned integer format that has a 14-bit R component in the top
14 bits of the word in bytes 0..1, and a 14-bit G component in the top
14 bits of the word in bytes 2..3, with the bottom 2 bits of each word
unused.

* 
[VK_FORMAT_R14X2G14X2B14X2A14X2_UINT_4PACK16_ARM](#) specifies a
four-component, 64-bit unsigned integer format that has a 14-bit R
component in the top 14 bits of the word in bytes 0..1, a 14-bit G
component in the top 14 bits of the word in bytes 2..3, a 14-bit B
component in the top 14 bits of the word in bytes 4..5, and a 14-bit A
component in the top 14 bits of the word in bytes 6..7, with the bottom
2 bits of each word unused.

* 
[VK_FORMAT_R14X2_UNORM_PACK16_ARM](#) specifies a one-component, 16-bit
unsigned normalized format that has a single 14-bit R component in the
top 14 bits of a 16-bit word, with the bottom 2 bits unused.

* 
[VK_FORMAT_R14X2G14X2_UNORM_2PACK16_ARM](#) specifies a two-component,
32-bit unsigned normalized format that has a 14-bit R component in the
top 14 bits of the word in bytes 0..1, and a 14-bit G component in the
top 14 bits of the word in bytes 2..3, with the bottom 2 bits of each
word unused.

* 
[VK_FORMAT_R14X2G14X2B14X2A14X2_UNORM_4PACK16_ARM](#) specifies a
four-component, 64-bit unsigned normalized format that has a 14-bit R
component in the top 14 bits of the word in bytes 0..1, a 14-bit G
component in the top 14 bits of the word in bytes 2..3, a 14-bit B
component in the top 14 bits of the word in bytes 4..5, and a 14-bit A
component in the top 14 bits of the word in bytes 6..7, with the bottom
2 bits of each word unused.

* 
[VK_FORMAT_G14X2_B14X2R14X2_2PLANE_420_UNORM_3PACK16_ARM](#) specifies
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
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the BR plane.
This format only supports images with a width and height that is a
multiple of two.

* 
[VK_FORMAT_G14X2_B14X2R14X2_2PLANE_422_UNORM_3PACK16_ARM](#) specifies
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
determined via [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html), using
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html) for the G plane, and
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) for the BR plane.
This format only supports images with a width that is a multiple of two.

* 
[VK_FORMAT_R8_BOOL_ARM](#) specifies a one-component 8-bit boolean
format that has a single 8-bit R component.
See [8-bit booleans](../../../../spec/latest/chapters/fundamentals.html#fundamentals-bool).

* 
[VK_FORMAT_R16_SFLOAT_FPENCODING_BFLOAT16_ARM](#) specifies a
one-component, 16-bit signed floating-point format with BFLOAT16
encoding that has a single 16-bit R component.

* 
[VK_FORMAT_R8_SFLOAT_FPENCODING_FLOAT8E4M3_ARM](#) specifies a
one-component, 8-bit signed floating-point format with FLOAT8E4M3
encoding that has a single 8-bit R component.

* 
[VK_FORMAT_R8_SFLOAT_FPENCODING_FLOAT8E5M2_ARM](#) specifies a
one-component, 8-bit signed floating-point format with FLOAT8E5M2
encoding that has a single 8-bit R component.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html), [VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html), [VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html), [VkAccelerationStructureTrianglesDisplacementMicromapNV](VkAccelerationStructureTrianglesDisplacementMicromapNV.html), [VkAndroidHardwareBufferFormatProperties2ANDROID](VkAndroidHardwareBufferFormatProperties2ANDROID.html), [VkAndroidHardwareBufferFormatPropertiesANDROID](VkAndroidHardwareBufferFormatPropertiesANDROID.html), [VkAndroidHardwareBufferFormatResolvePropertiesANDROID](VkAndroidHardwareBufferFormatResolvePropertiesANDROID.html), [VkAttachmentDescription](VkAttachmentDescription.html), [VkAttachmentDescription2](VkAttachmentDescription2.html), [VkBufferViewCreateInfo](VkBufferViewCreateInfo.html), [VkClusterAccelerationStructureTriangleClusterInputNV](VkClusterAccelerationStructureTriangleClusterInputNV.html), [VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html), [VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html), [VkDescriptorAddressInfoEXT](VkDescriptorAddressInfoEXT.html), [VkFramebufferAttachmentImageInfo](VkFramebufferAttachmentImageInfo.html), [VkGeometryTrianglesNV](VkGeometryTrianglesNV.html), [VkImageCreateInfo](VkImageCreateInfo.html), [VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html), [VkImageViewASTCDecodeModeEXT](VkImageViewASTCDecodeModeEXT.html), [VkImageViewCreateInfo](VkImageViewCreateInfo.html), [VkNativeBufferFormatPropertiesOHOS](VkNativeBufferFormatPropertiesOHOS.html), [VkOpticalFlowImageFormatPropertiesNV](VkOpticalFlowImageFormatPropertiesNV.html), [VkOpticalFlowSessionCreateInfoNV](VkOpticalFlowSessionCreateInfoNV.html), [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html), [VkPhysicalDeviceSparseImageFormatInfo2](VkPhysicalDeviceSparseImageFormatInfo2.html), [VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html), [VkRenderingAreaInfo](VkRenderingAreaInfo.html), [VkSamplerCustomBorderColorCreateInfoEXT](VkSamplerCustomBorderColorCreateInfoEXT.html), [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html), [VkScreenBufferFormatPropertiesQNX](VkScreenBufferFormatPropertiesQNX.html), [VkSurfaceFormatKHR](VkSurfaceFormatKHR.html), [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html), [VkTensorDescriptionARM](VkTensorDescriptionARM.html), [VkTensorViewCreateInfoARM](VkTensorViewCreateInfoARM.html), [VkTexelBufferDescriptorInfoEXT](VkTexelBufferDescriptorInfoEXT.html), [VkVertexInputAttributeDescription](VkVertexInputAttributeDescription.html), [VkVertexInputAttributeDescription2EXT](VkVertexInputAttributeDescription2EXT.html), [VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html), [VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html), [vkGetPhysicalDeviceExternalImageFormatPropertiesNV](vkGetPhysicalDeviceExternalImageFormatPropertiesNV.html), [vkGetPhysicalDeviceFormatProperties](vkGetPhysicalDeviceFormatProperties.html), [vkGetPhysicalDeviceFormatProperties2](vkGetPhysicalDeviceFormatProperties2.html), [vkGetPhysicalDeviceFormatProperties2](vkGetPhysicalDeviceFormatProperties2.html), [vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html), [vkGetPhysicalDeviceSparseImageFormatProperties](vkGetPhysicalDeviceSparseImageFormatProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/formats.html#VkFormat).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
