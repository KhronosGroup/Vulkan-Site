# VK_QCOM_image_processing2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_image_processing2.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_image_processing2](#VK_QCOM_image_processing2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QCOM_image_processing2 - device extension

**Name String**

`VK_QCOM_image_processing2`

**Extension Type**

Device extension

**Registered Extension Number**

519

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_QCOM_image_processing](VK_QCOM_image_processing.html)

**SPIR-V Dependencies**

* 
[SPV_QCOM_image_processing2](https://github.khronos.org/SPIRV-Registry/extensions/QCOM/SPV_QCOM_image_processing2.html)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_image_processing2] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_image_processing2 extension*)

**Last Modified Date**

2023-03-10

**Interactions and External Dependencies**

* 
This extension provides API support for
[`GL_QCOM_image_processing2`](https://github.com/KhronosGroup/GLSL/blob/main/extensions/qcom/GLSL_QCOM_image_processing2.txt)

**Contributors**

* 
Jeff Leger, Qualcomm Technologies, Inc.

This extension enables support for the SPIR-V `TextureBlockMatch2QCOM`
capability.
It builds on the functionality of QCOM_image_processing with the addition of
4 new image processing operations.

* 
The `opImageBlockMatchWindowSADQCOM`` SPIR-V instruction builds upon
the functionality of `opImageBlockMatchSADQCOM`` by repeatedly
performing block match operations across a 2D window.
The “2D windowExtent” and “compareMode” are specified by
[VkSamplerBlockMatchWindowCreateInfoQCOM](VkSamplerBlockMatchWindowCreateInfoQCOM.html) in the sampler used to
create the *target image*.
Like `OpImageBlockMatchSADQCOM`, `opImageBlockMatchWindowSADQCOM`
computes an error metric, that describes whether a block of texels in
the *target image* matches a corresponding block of texels in the
*reference image*.
Unlike `OpImageBlockMatchSADQCOM`, this instruction computes an error
metric at each (X,Y) location within the 2D window and returns either
the minimum or maximum error.
The instruction only supports single-component formats.
Refer to the pseudocode below for details.

* 
The `opImageBlockMatchWindowSSDQCOM` follows the same pattern,
computing the SSD error metric at each location within the 2D window.

* 
The `opImageBlockMatchGatherSADQCOM` builds upon
`OpImageBlockMatchSADQCOM`.
This instruction computes an error metric, that describes whether a
block of texels in the *target image* matches a corresponding block of
texels in the *reference image*.
The instruction computes the SAD error metric at 4 texel offsets and
returns the error metric for each offset in the X,Y,Z,and W components.
The instruction only supports single-component texture formats.
Refer to the pseudocode below for details.

* 
The `opImageBlockMatchGatherSSDQCOM` follows the same pattern,
computing the SSD error metric for 4 offsets.

Each of the above 4 image processing instructions are limited to
single-component formats.

Below is the pseudocode for GLSL built-in function
`textureWindowBlockMatchSADQCOM`.
The pseudocode for `textureWindowBlockMatchSSD` is identical other than
replacing all instances of `"SAD"` with `"SSD"`.

vec4 textureBlockMatchWindowSAD( sampler2D target,
                                 uvec2 targetCoord,
                                 sampler2D reference,
                                 uvec2 refCoord,
                                 uvec2 blocksize) {
    // compareMode (MIN or MAX) comes from the vkSampler associated with `target`
    // uvec2 window  comes from the vkSampler associated with `target`
    minSAD = INF;
    maxSAD = -INF;
    uvec2 minCoord;
    uvec2 maxCoord;

    for (uint x=0, x  maxSAD) {
                maxSAD = SAD;
                maxCoord = uvec2(x,y);
            }
        }
    }
    if (compareMode=MIN) {
        return vec4(minSAD, minCoord.x, minCoord.y, 0.0);
    } else {
        return vec4(maxSAD, maxCoord.x, maxCoord.y, 0.0);
    }
}

Below is the pseudocode for `textureBlockMatchGatherSADQCOM`.
The pseudocode for `textureBlockMatchGatherSSD` follows an identical
pattern.

vec4 textureBlockMatchGatherSAD( sampler2D target,
                                 uvec2 targetCoord,
                                 sampler2D reference,
                                 uvec2 refCoord,
                                 uvec2 blocksize) {
    vec4 out;
    for (uint x=0, x

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceImageProcessing2FeaturesQCOM](VkPhysicalDeviceImageProcessing2FeaturesQCOM.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceImageProcessing2PropertiesQCOM](VkPhysicalDeviceImageProcessing2PropertiesQCOM.html)

Extending [VkSamplerCreateInfo](VkSamplerCreateInfo.html):

* 
[VkSamplerBlockMatchWindowCreateInfoQCOM](VkSamplerBlockMatchWindowCreateInfoQCOM.html)

* 
[VkBlockMatchWindowCompareModeQCOM](VkBlockMatchWindowCompareModeQCOM.html)

* 
`VK_QCOM_IMAGE_PROCESSING_2_EXTENSION_NAME`

* 
`VK_QCOM_IMAGE_PROCESSING_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_PROCESSING_2_FEATURES_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_PROCESSING_2_PROPERTIES_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SAMPLER_BLOCK_MATCH_WINDOW_CREATE_INFO_QCOM](VkStructureType.html)

1) What is the precision of the min/max comparison checks?

**RESOLVED**: Intermediate computations for the new operations are performed
at 16-bit floating-point precision.
If the value of `"float SAD"` in the above code sample is a 16-bit denorm
value, then behavior of the MIN/MAX comparison is undefined.

* 
Revision 1, 2023-03-10 (Jeff Leger)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_image_processing2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
