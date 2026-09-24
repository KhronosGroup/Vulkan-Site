# VkLayerProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkLayerProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkLayerProperties - Structure specifying layer properties

The `VkLayerProperties` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkLayerProperties {
    char        layerName[VK_MAX_EXTENSION_NAME_SIZE];
    uint32_t    specVersion;
    uint32_t    implementationVersion;
    char        description[VK_MAX_DESCRIPTION_SIZE];
} VkLayerProperties;

* 
`layerName` is an array of [VK_MAX_EXTENSION_NAME_SIZE](VK_MAX_EXTENSION_NAME_SIZE.html)
`char` containing a null-terminated UTF-8 string which is the name of
the layer.
Use this name in the `ppEnabledLayerNames` array passed in the
[VkInstanceCreateInfo](VkInstanceCreateInfo.html) structure to enable this layer for an
instance.

* 
`specVersion` is the Vulkan version the layer was written to,
encoded as described in [Version Numbers](../../../../spec/latest/chapters/extensions.html#extendingvulkan-coreversions-versionnumbers).

* 
`implementationVersion` is the version of this layer.
It is an integer, increasing with backward compatible changes.

* 
`description` is an array of [VK_MAX_DESCRIPTION_SIZE](VK_MAX_DESCRIPTION_SIZE.html) `char`
containing a null-terminated UTF-8 string which provides additional
details that **can** be used by the application to identify the layer.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [vkEnumerateDeviceLayerProperties](vkEnumerateDeviceLayerProperties.html), [vkEnumerateInstanceLayerProperties](vkEnumerateInstanceLayerProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/extensions.html#VkLayerProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
