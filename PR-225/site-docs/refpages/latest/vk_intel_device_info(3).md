# VK_INTEL_device_info(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_INTEL_device_info.html

## Table of Contents

- [Name](#_name)
- [VK_INTEL_device_info](#VK_INTEL_device_info)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_INTEL_device_info - device extension

**Name String**

`VK_INTEL_device_info`

**Extension Type**

Device extension

**Registered Extension Number**

709

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Jakub Szymczyk [jakubszy](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_INTEL_device_info] @jakubszy%0A*Here describe the issue or question you have about the VK_INTEL_device_info extension*)

**Last Modified Date**

2026-09-08

**IP Status**

No known IP claims.

**Contributors**

* 
Jakub Szymczyk, Intel

* 
Sławomir Grajewski, Intel

This extension adds a new query to obtain the version of the graphics
intellectual property (IP) block implemented by a physical device.

The IP version is reported as three separate values: an architecture
generation, a release within that generation, and a revision within that
release.
[VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`deviceID` identifies a device
precisely, but does not indicate which graphics IP that device implements
without a lookup table maintained by the application.
These values expose the graphics IP directly, and are ordered, so an
application can compare them in order of significance to select between code
paths tuned for a minimum graphics IP version.

A physical device which does not report an IP version reports zero for all
three values, so an application should check for this case rather than
treating the values as an IP version.

* 
Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

[VkPhysicalDeviceInfoPropertiesINTEL](VkPhysicalDeviceInfoPropertiesINTEL.html)

* 
`VK_INTEL_DEVICE_INFO_EXTENSION_NAME`

* 
`VK_INTEL_DEVICE_INFO_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INFO_PROPERTIES_INTEL](VkStructureType.html)

Query the IP version of a physical device:

VkPhysicalDeviceInfoPropertiesINTEL deviceInfoProps = {};
deviceInfoProps.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INFO_PROPERTIES_INTEL;

VkPhysicalDeviceProperties2 props2 = {};
props2.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROPERTIES_2;
props2.pNext = &deviceInfoProps;

vkGetPhysicalDeviceProperties2(physicalDevice, &props2);

Reported values could be used to gate certain code paths based on minimum
requirements:

bool meetsMinimumIpVersion(const VkPhysicalDeviceInfoPropertiesINTEL& props,
                           uint32_t arch, uint32_t release, uint32_t revision)
{
    if (props.deviceIpVersionArch != arch)
    {
        return props.deviceIpVersionArch > arch;
    }
    if (props.deviceIpVersionRelease != release)
    {
        return props.deviceIpVersionRelease > release;
    }
    return props.deviceIpVersionRevision >= revision;
}

* 
Revision 1, 2026-09-08 (Jakub Szymczyk)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_INTEL_device_info).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
