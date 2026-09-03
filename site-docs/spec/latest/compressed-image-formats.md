# Compressed Image Formats

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/appendices/compressedtex.html

## Table of Contents

- [Block-Compressed Image Formats](#appendix-compressedtex-bc)
- [Block-Compressed_Image_Formats](#appendix-compressedtex-bc)
- [ETC Compressed Image Formats](#appendix-compressedtex-etc2)
- [ETC_Compressed_Image_Formats](#appendix-compressedtex-etc2)
- [ASTC Compressed Image Formats](#appendix-compressedtex-astc)
- [ASTC_Compressed_Image_Formats](#appendix-compressedtex-astc)
- [ASTC Decode Mode](#_astc_decode_mode)
- [ASTC_Decode_Mode](#_astc_decode_mode)
- [PVRTC Compressed Image Formats](#appendix-compressedtex-pvrtc)
- [PVRTC_Compressed_Image_Formats](#appendix-compressedtex-pvrtc)

## Content

The compressed texture formats used by Vulkan are described in the
specifically identified sections of the [Khronos Data Format Specification](../chapters/introduction.html#data-format), version 1.3.

Unless otherwise described, the quantities encoded in these compressed
formats are treated as normalized, unsigned values.

Those formats listed as sRGB-encoded have in-memory representations of
R, G and B components which are nonlinearly-encoded as
R', G', and B'; any alpha component is unchanged.
As part of filtering, the nonlinear R', G', and B' values
are converted to linear R, G, and B components; any alpha
component is unchanged.
The conversion between linear and nonlinear encoding is performed as
described in the “KHR_DF_TRANSFER_SRGB” section of the Khronos Data Format
Specification.

BC1, BC2, and BC3 formats are described in “S3TC Compressed Texture Image
Formats” chapter of the [Khronos Data Format Specification](../chapters/introduction.html#data-format).
BC4 and BC5 are described in the “RGTC Compressed Texture Image Formats”
chapter.
BC6H and BC7 are described in the “BPTC Compressed Texture Image Formats”
chapter.

| [VkFormat](../chapters/formats.html#VkFormat) | [Khronos Data Format Specification](../chapters/introduction.html#data-format) description |
| --- | --- |
| Formats described in the “S3TC Compressed Texture Image Formats” chapter |
| [VK_FORMAT_BC1_RGB_UNORM_BLOCK](../chapters/formats.html#VkFormat) | BC1 with no alpha |
| [VK_FORMAT_BC1_RGB_SRGB_BLOCK](../chapters/formats.html#VkFormat) | BC1 with no alpha, sRGB-encoded |
| [VK_FORMAT_BC1_RGBA_UNORM_BLOCK](../chapters/formats.html#VkFormat) | BC1 with alpha |
| [VK_FORMAT_BC1_RGBA_SRGB_BLOCK](../chapters/formats.html#VkFormat) | BC1 with alpha, sRGB-encoded |
| [VK_FORMAT_BC2_UNORM_BLOCK](../chapters/formats.html#VkFormat) | BC2 |
| [VK_FORMAT_BC2_SRGB_BLOCK](../chapters/formats.html#VkFormat) | BC2, sRGB-encoded |
| [VK_FORMAT_BC3_UNORM_BLOCK](../chapters/formats.html#VkFormat) | BC3 |
| [VK_FORMAT_BC3_SRGB_BLOCK](../chapters/formats.html#VkFormat) | BC3, sRGB-encoded |
| Formats described in the “RGTC Compressed Texture Image Formats” chapter |
| [VK_FORMAT_BC4_UNORM_BLOCK](../chapters/formats.html#VkFormat) | BC4 unsigned |
| [VK_FORMAT_BC4_SNORM_BLOCK](../chapters/formats.html#VkFormat) | BC4 signed |
| [VK_FORMAT_BC5_UNORM_BLOCK](../chapters/formats.html#VkFormat) | BC5 unsigned |
| [VK_FORMAT_BC5_SNORM_BLOCK](../chapters/formats.html#VkFormat) | BC5 signed |
| Formats described in the “BPTC Compressed Texture Image Formats” chapter |
| [VK_FORMAT_BC6H_UFLOAT_BLOCK](../chapters/formats.html#VkFormat) | BC6H (unsigned version) |
| [VK_FORMAT_BC6H_SFLOAT_BLOCK](../chapters/formats.html#VkFormat) | BC6H (signed version) |
| [VK_FORMAT_BC7_UNORM_BLOCK](../chapters/formats.html#VkFormat) | BC7 |
| [VK_FORMAT_BC7_SRGB_BLOCK](../chapters/formats.html#VkFormat) | BC7, sRGB-encoded |

The following formats are described in the “ETC2 Compressed Texture Image
Formats” chapter of the [Khronos Data Format Specification](../chapters/introduction.html#data-format).

| [VkFormat](../chapters/formats.html#VkFormat) | [Khronos Data Format Specification](../chapters/introduction.html#data-format) description |
| --- | --- |
| [VK_FORMAT_ETC2_R8G8B8_UNORM_BLOCK](../chapters/formats.html#VkFormat) | RGB ETC2 |
| [VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK](../chapters/formats.html#VkFormat) | RGB ETC2 with sRGB encoding |
| [VK_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK](../chapters/formats.html#VkFormat) | RGB ETC2 with punch-through alpha |
| [VK_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK](../chapters/formats.html#VkFormat) | RGB ETC2 with punch-through alpha and sRGB |
| [VK_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK](../chapters/formats.html#VkFormat) | RGBA ETC2 |
| [VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK](../chapters/formats.html#VkFormat) | RGBA ETC2 with sRGB encoding |
| [VK_FORMAT_EAC_R11_UNORM_BLOCK](../chapters/formats.html#VkFormat) | Unsigned R11 EAC |
| [VK_FORMAT_EAC_R11_SNORM_BLOCK](../chapters/formats.html#VkFormat) | Signed R11 EAC |
| [VK_FORMAT_EAC_R11G11_UNORM_BLOCK](../chapters/formats.html#VkFormat) | Unsigned RG11 EAC |
| [VK_FORMAT_EAC_R11G11_SNORM_BLOCK](../chapters/formats.html#VkFormat) | Signed RG11 EAC |

ASTC formats are described in the “ASTC Compressed Texture Image Formats”
chapter of the [Khronos Data Format Specification](../chapters/introduction.html#data-format).

| [VkFormat](../chapters/formats.html#VkFormat) | Compressed texel block dimensions | Requested mode |
| --- | --- | --- |
| [VK_FORMAT_ASTC_4x4_UNORM_BLOCK](../chapters/formats.html#VkFormat) | 4 × 4 | Linear LDR |
| [VK_FORMAT_ASTC_4x4_SRGB_BLOCK](../chapters/formats.html#VkFormat) | 4 × 4 | sRGB |
| [VK_FORMAT_ASTC_5x4_UNORM_BLOCK](../chapters/formats.html#VkFormat) | 5 × 4 | Linear LDR |
| [VK_FORMAT_ASTC_5x4_SRGB_BLOCK](../chapters/formats.html#VkFormat) | 5 × 4 | sRGB |
| [VK_FORMAT_ASTC_5x5_UNORM_BLOCK](../chapters/formats.html#VkFormat) | 5 × 5 | Linear LDR |
| [VK_FORMAT_ASTC_5x5_SRGB_BLOCK](../chapters/formats.html#VkFormat) | 5 × 5 | sRGB |
| [VK_FORMAT_ASTC_6x5_UNORM_BLOCK](../chapters/formats.html#VkFormat) | 6 × 5 | Linear LDR |
| [VK_FORMAT_ASTC_6x5_SRGB_BLOCK](../chapters/formats.html#VkFormat) | 6 × 5 | sRGB |
| [VK_FORMAT_ASTC_6x6_UNORM_BLOCK](../chapters/formats.html#VkFormat) | 6 × 6 | Linear LDR |
| [VK_FORMAT_ASTC_6x6_SRGB_BLOCK](../chapters/formats.html#VkFormat) | 6 × 6 | sRGB |
| [VK_FORMAT_ASTC_8x5_UNORM_BLOCK](../chapters/formats.html#VkFormat) | 8 × 5 | Linear LDR |
| [VK_FORMAT_ASTC_8x5_SRGB_BLOCK](../chapters/formats.html#VkFormat) | 8 × 5 | sRGB |
| [VK_FORMAT_ASTC_8x6_UNORM_BLOCK](../chapters/formats.html#VkFormat) | 8 × 6 | Linear LDR |
| [VK_FORMAT_ASTC_8x6_SRGB_BLOCK](../chapters/formats.html#VkFormat) | 8 × 6 | sRGB |
| [VK_FORMAT_ASTC_8x8_UNORM_BLOCK](../chapters/formats.html#VkFormat) | 8 × 8 | Linear LDR |
| [VK_FORMAT_ASTC_8x8_SRGB_BLOCK](../chapters/formats.html#VkFormat) | 8 × 8 | sRGB |
| [VK_FORMAT_ASTC_10x5_UNORM_BLOCK](../chapters/formats.html#VkFormat) | 10 × 5 | Linear LDR |
| [VK_FORMAT_ASTC_10x5_SRGB_BLOCK](../chapters/formats.html#VkFormat) | 10 × 5 | sRGB |
| [VK_FORMAT_ASTC_10x6_UNORM_BLOCK](../chapters/formats.html#VkFormat) | 10 × 6 | Linear LDR |
| [VK_FORMAT_ASTC_10x6_SRGB_BLOCK](../chapters/formats.html#VkFormat) | 10 × 6 | sRGB |
| [VK_FORMAT_ASTC_10x8_UNORM_BLOCK](../chapters/formats.html#VkFormat) | 10 × 8 | Linear LDR |
| [VK_FORMAT_ASTC_10x8_SRGB_BLOCK](../chapters/formats.html#VkFormat) | 10 × 8 | sRGB |
| [VK_FORMAT_ASTC_10x10_UNORM_BLOCK](../chapters/formats.html#VkFormat) | 10 × 10 | Linear LDR |
| [VK_FORMAT_ASTC_10x10_SRGB_BLOCK](../chapters/formats.html#VkFormat) | 10 × 10 | sRGB |
| [VK_FORMAT_ASTC_12x10_UNORM_BLOCK](../chapters/formats.html#VkFormat) | 12 × 10 | Linear LDR |
| [VK_FORMAT_ASTC_12x10_SRGB_BLOCK](../chapters/formats.html#VkFormat) | 12 × 10 | sRGB |
| [VK_FORMAT_ASTC_12x12_UNORM_BLOCK](../chapters/formats.html#VkFormat) | 12 × 12 | Linear LDR |
| [VK_FORMAT_ASTC_12x12_SRGB_BLOCK](../chapters/formats.html#VkFormat) | 12 × 12 | sRGB |
| [VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK](../chapters/formats.html#VkFormat) | 4 × 4 | HDR |
| [VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK](../chapters/formats.html#VkFormat) | 5 × 4 | HDR |
| [VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK](../chapters/formats.html#VkFormat) | 5 × 5 | HDR |
| [VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK](../chapters/formats.html#VkFormat) | 6 × 5 | HDR |
| [VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK](../chapters/formats.html#VkFormat) | 6 × 6 | HDR |
| [VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK](../chapters/formats.html#VkFormat) | 8 × 5 | HDR |
| [VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK](../chapters/formats.html#VkFormat) | 8 × 6 | HDR |
| [VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK](../chapters/formats.html#VkFormat) | 8 × 8 | HDR |
| [VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK](../chapters/formats.html#VkFormat) | 10 × 5 | HDR |
| [VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK](../chapters/formats.html#VkFormat) | 10 × 6 | HDR |
| [VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK](../chapters/formats.html#VkFormat) | 10 × 8 | HDR |
| [VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK](../chapters/formats.html#VkFormat) | 10 × 10 | HDR |
| [VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK](../chapters/formats.html#VkFormat) | 12 × 10 | HDR |
| [VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK](../chapters/formats.html#VkFormat) | 12 × 12 | HDR |
| [VK_FORMAT_ASTC_3x3x3_UNORM_BLOCK_EXT](../chapters/formats.html#VkFormat) | 3 × 3 × 3 | Linear LDR |
| [VK_FORMAT_ASTC_3x3x3_SRGB_BLOCK_EXT](../chapters/formats.html#VkFormat) | 3 × 3 × 3 | sRGB |
| [VK_FORMAT_ASTC_3x3x3_SFLOAT_BLOCK_EXT](../chapters/formats.html#VkFormat) | 3 × 3 × 3 | HDR |
| [VK_FORMAT_ASTC_4x3x3_UNORM_BLOCK_EXT](../chapters/formats.html#VkFormat) | 4 × 3 × 3 | Linear LDR |
| [VK_FORMAT_ASTC_4x3x3_SRGB_BLOCK_EXT](../chapters/formats.html#VkFormat) | 4 × 3 × 3 | sRGB |
| [VK_FORMAT_ASTC_4x3x3_SFLOAT_BLOCK_EXT](../chapters/formats.html#VkFormat) | 4 × 3 × 3 | HDR |
| [VK_FORMAT_ASTC_4x4x3_UNORM_BLOCK_EXT](../chapters/formats.html#VkFormat) | 4 × 4 × 3 | Linear LDR |
| [VK_FORMAT_ASTC_4x4x3_SRGB_BLOCK_EXT](../chapters/formats.html#VkFormat) | 4 × 4 × 3 | sRGB |
| [VK_FORMAT_ASTC_4x4x3_SFLOAT_BLOCK_EXT](../chapters/formats.html#VkFormat) | 4 × 4 × 3 | HDR |
| [VK_FORMAT_ASTC_4x4x4_UNORM_BLOCK_EXT](../chapters/formats.html#VkFormat) | 4 × 4 × 4 | Linear LDR |
| [VK_FORMAT_ASTC_4x4x4_SRGB_BLOCK_EXT](../chapters/formats.html#VkFormat) | 4 × 4 × 4 | sRGB |
| [VK_FORMAT_ASTC_4x4x4_SFLOAT_BLOCK_EXT](../chapters/formats.html#VkFormat) | 4 × 4 × 4 | HDR |
| [VK_FORMAT_ASTC_5x4x4_UNORM_BLOCK_EXT](../chapters/formats.html#VkFormat) | 5 × 4 × 4 | Linear LDR |
| [VK_FORMAT_ASTC_5x4x4_SRGB_BLOCK_EXT](../chapters/formats.html#VkFormat) | 5 × 4 × 4 | sRGB |
| [VK_FORMAT_ASTC_5x4x4_SFLOAT_BLOCK_EXT](../chapters/formats.html#VkFormat) | 5 × 4 × 4 | HDR |
| [VK_FORMAT_ASTC_5x5x4_UNORM_BLOCK_EXT](../chapters/formats.html#VkFormat) | 5 × 5 × 4 | Linear LDR |
| [VK_FORMAT_ASTC_5x5x4_SRGB_BLOCK_EXT](../chapters/formats.html#VkFormat) | 5 × 5 × 4 | sRGB |
| [VK_FORMAT_ASTC_5x5x4_SFLOAT_BLOCK_EXT](../chapters/formats.html#VkFormat) | 5 × 5 × 4 | HDR |
| [VK_FORMAT_ASTC_5x5x5_UNORM_BLOCK_EXT](../chapters/formats.html#VkFormat) | 5 × 5 × 5 | Linear LDR |
| [VK_FORMAT_ASTC_5x5x5_SRGB_BLOCK_EXT](../chapters/formats.html#VkFormat) | 5 × 5 × 5 | sRGB |
| [VK_FORMAT_ASTC_5x5x5_SFLOAT_BLOCK_EXT](../chapters/formats.html#VkFormat) | 5 × 5 × 5 | HDR |
| [VK_FORMAT_ASTC_6x5x5_UNORM_BLOCK_EXT](../chapters/formats.html#VkFormat) | 6 × 5 × 5 | Linear LDR |
| [VK_FORMAT_ASTC_6x5x5_SRGB_BLOCK_EXT](../chapters/formats.html#VkFormat) | 6 × 5 × 5 | sRGB |
| [VK_FORMAT_ASTC_6x5x5_SFLOAT_BLOCK_EXT](../chapters/formats.html#VkFormat) | 6 × 5 × 5 | HDR |
| [VK_FORMAT_ASTC_6x6x5_UNORM_BLOCK_EXT](../chapters/formats.html#VkFormat) | 6 × 6 × 5 | Linear LDR |
| [VK_FORMAT_ASTC_6x6x5_SRGB_BLOCK_EXT](../chapters/formats.html#VkFormat) | 6 × 6 × 5 | sRGB |
| [VK_FORMAT_ASTC_6x6x5_SFLOAT_BLOCK_EXT](../chapters/formats.html#VkFormat) | 6 × 6 × 5 | HDR |
| [VK_FORMAT_ASTC_6x6x6_UNORM_BLOCK_EXT](../chapters/formats.html#VkFormat) | 6 × 6 × 6 | Linear LDR |
| [VK_FORMAT_ASTC_6x6x6_SRGB_BLOCK_EXT](../chapters/formats.html#VkFormat) | 6 × 6 × 6 | sRGB |
| [VK_FORMAT_ASTC_6x6x6_SFLOAT_BLOCK_EXT](../chapters/formats.html#VkFormat) | 6 × 6 × 6 | HDR |

ASTC textures containing HDR block encodings **should** be passed to the API
using an ASTC SFLOAT texture format.

|  | An HDR block in a texture passed using a LDR UNORM format will return the
| --- | --- |
appropriate ASTC error color if the implementation supports only the ASTC
LDR profile, but may result in either the error color or a decompressed HDR
color if the implementation supports HDR decoding. |

If the `VK_EXT_astc_decode_mode` extension is enabled, the decode mode is
determined as follows:

| [VkFormat](../chapters/formats.html#VkFormat) | Decoding mode |
| --- | --- |
| [VK_FORMAT_R16G16B16A16_SFLOAT](../chapters/formats.html#VkFormat) | decode_float16 |
| [VK_FORMAT_R8G8B8A8_UNORM](../chapters/formats.html#VkFormat) | decode_unorm8 |
| [VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](../chapters/formats.html#VkFormat) | decode_rgb9e5 |

Otherwise, the ASTC decode mode is decode_float16.

Note that an implementation **may** use HDR mode when linear LDR mode is
requested unless the decode mode is decode_unorm8.

PVRTC formats are described in the “PVRTC Compressed Texture Image
Formats” chapter of the [Khronos Data Format Specification](../chapters/introduction.html#data-format).

| [VkFormat](../chapters/formats.html#VkFormat) | Compressed texel block dimensions | sRGB-encoded |
| --- | --- | --- |
| [VK_FORMAT_PVRTC1_2BPP_UNORM_BLOCK_IMG](../chapters/formats.html#VkFormat) | 8 × 4 | No |
| [VK_FORMAT_PVRTC1_4BPP_UNORM_BLOCK_IMG](../chapters/formats.html#VkFormat) | 4 × 4 | No |
| [VK_FORMAT_PVRTC2_2BPP_UNORM_BLOCK_IMG](../chapters/formats.html#VkFormat) | 8 × 4 | No |
| [VK_FORMAT_PVRTC2_4BPP_UNORM_BLOCK_IMG](../chapters/formats.html#VkFormat) | 4 × 4 | No |
| [VK_FORMAT_PVRTC1_2BPP_SRGB_BLOCK_IMG](../chapters/formats.html#VkFormat) | 8 × 4 | Yes |
| [VK_FORMAT_PVRTC1_4BPP_SRGB_BLOCK_IMG](../chapters/formats.html#VkFormat) | 4 × 4 | Yes |
| [VK_FORMAT_PVRTC2_2BPP_SRGB_BLOCK_IMG](../chapters/formats.html#VkFormat) | 8 × 4 | Yes |
| [VK_FORMAT_PVRTC2_4BPP_SRGB_BLOCK_IMG](../chapters/formats.html#VkFormat) | 4 × 4 | Yes |
