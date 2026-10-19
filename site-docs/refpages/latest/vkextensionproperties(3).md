# VkExtensionProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExtensionProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExtensionProperties - Structure specifying an extension properties

The `VkExtensionProperties` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkExtensionProperties {
    char        extensionName[VK_MAX_EXTENSION_NAME_SIZE];
    uint32_t    specVersion;
} VkExtensionProperties;

* 
`extensionName` is an array of [VK_MAX_EXTENSION_NAME_SIZE](VK_MAX_EXTENSION_NAME_SIZE.html)
`char` containing a null-terminated UTF-8 string which is the name of
the extension.

* 
`specVersion` is the version of this extension.
It is an integer, incremented with backward compatible changes.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html), [VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html), [vkEnumerateDeviceExtensionProperties](vkEnumerateDeviceExtensionProperties.html), [vkEnumerateInstanceExtensionProperties](vkEnumerateInstanceExtensionProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/extensions.html#VkExtensionProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
