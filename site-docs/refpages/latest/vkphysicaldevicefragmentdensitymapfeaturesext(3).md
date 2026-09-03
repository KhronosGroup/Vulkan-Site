# VkPhysicalDeviceFragmentDensityMapFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceFragmentDensityMapFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceFragmentDensityMapFeaturesEXT - Structure describing fragment density map features that can be supported by an implementation

The `VkPhysicalDeviceFragmentDensityMapFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_fragment_density_map
typedef struct VkPhysicalDeviceFragmentDensityMapFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           fragmentDensityMap;
    VkBool32           fragmentDensityMapDynamic;
    VkBool32           fragmentDensityMapNonSubsampledImages;
} VkPhysicalDeviceFragmentDensityMapFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `fragmentDensityMap` specifies
whether the implementation supports render passes with a fragment
density map attachment.
If this feature is not enabled and the `pNext` chain of
[VkRenderPassCreateInfo](VkRenderPassCreateInfo.html) includes a
[VkRenderPassFragmentDensityMapCreateInfoEXT](VkRenderPassFragmentDensityMapCreateInfoEXT.html) structure,
`fragmentDensityMapAttachment` **must** be [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html).

* 
 `fragmentDensityMapDynamic`
specifies whether the implementation supports dynamic fragment density
map image views.
If this feature is not enabled,
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DYNAMIC_BIT_EXT](VkImageViewCreateFlagBits.html) **must**
not be included in [VkImageViewCreateInfo](VkImageViewCreateInfo.html)::`flags`.

* 

`fragmentDensityMapNonSubsampledImages` specifies whether the
implementation supports regular non-subsampled image attachments with
fragment density map render passes.
If this feature is not enabled, render passes with a
[fragment density map    attachment](../../../../spec/latest/chapters/renderpass.html#renderpass-fragmentdensitymapattachment) **must** only have [subsampled    attachments](../../../../spec/latest/chapters/samplers.html#samplers-subsamplesampler) bound.

If the `VkPhysicalDeviceFragmentDensityMapFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceFragmentDensityMapFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentDensityMapFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceFragmentDensityMapFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceFragmentDensityMapFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
