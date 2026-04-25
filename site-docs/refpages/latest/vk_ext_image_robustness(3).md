# VK_EXT_image_robustness(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_image_robustness.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_image_robustness](#VK_EXT_image_robustness)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_image_robustness - device extension

**Name String**

`VK_EXT_image_robustness`

**Extension Type**

Device extension

**Registered Extension Number**

336

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Graeme Leese [gnl21](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_image_robustness] @gnl21%0A*Here describe the issue or question you have about the VK_EXT_image_robustness extension*)

**Last Modified Date**

2020-04-27

**IP Status**

No known IP claims.

**Contributors**

* 
Graeme Leese, Broadcom

* 
Jan-Harald Fredriksen, ARM

* 
Jeff Bolz, NVIDIA

* 
Spencer Fricke, Samsung

* 
Courtney Goeltzenleuchter, Google

* 
Slawomir Cygan, Intel

This extension adds stricter requirements for how out of bounds reads from
images are handled.
Rather than returning undefined values, most out of bounds reads return R,
G, and B values of zero and alpha values of either zero or one.
Components not present in the image format may be set to zero or to values
based on the format as described in [Component Substitution](../../../../spec/latest/chapters/images.html#images-component-substitution).

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceImageRobustnessFeaturesEXT](VkPhysicalDeviceImageRobustnessFeatures.html)

* 
`VK_EXT_IMAGE_ROBUSTNESS_EXTENSION_NAME`

* 
`VK_EXT_IMAGE_ROBUSTNESS_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_ROBUSTNESS_FEATURES_EXT](VkStructureType.html)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the EXT
suffix omitted.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

How does this extension differ from VK_EXT_robustness2?

The guarantees provided by this extension are a subset of those provided by
the robustImageAccess2 feature of VK_EXT_robustness2.
Where this extension allows return values of (0, 0, 0, 0) or (0, 0, 0, 1),
robustImageAccess2 requires that a particular value dependent on the image
format be returned.
This extension provides no guarantees about the values returned for an
access to an invalid Lod.

None.

* 
Revision 1, 2020-04-27 (Graeme Leese)

* 
Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_image_robustness).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
