# VK_AMD_shader_info(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_AMD_shader_info.html

## Table of Contents

- [Name](#_name)
- [VK_AMD_shader_info](#VK_AMD_shader_info)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_AMD_shader_info - device extension

**Name String**

`VK_AMD_shader_info`

**Extension Type**

Device extension

**Registered Extension Number**

43

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Special Use**

* 
[Developer tools](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Jaakko Konttinen [jaakkoamd](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_AMD_shader_info] @jaakkoamd%0A*Here describe the issue or question you have about the VK_AMD_shader_info extension*)

**Last Modified Date**

2017-10-09

**IP Status**

No known IP claims.

**Contributors**

* 
Jaakko Konttinen, AMD

This extension adds a way to query certain information about a compiled
shader which is part of a pipeline.
This information may include shader disassembly, shader binary and various
statistics about a shader’s resource usage.

While this extension provides a mechanism for extracting this information,
the details regarding the contents or format of this information are not
specified by this extension and may be provided by the vendor externally.

Furthermore, all information types are optionally supported, and users
should not assume every implementation supports querying every type of
information.

* 
[vkGetShaderInfoAMD](vkGetShaderInfoAMD.html)

* 
[VkShaderResourceUsageAMD](VkShaderResourceUsageAMD.html)

* 
[VkShaderStatisticsInfoAMD](VkShaderStatisticsInfoAMD.html)

* 
[VkShaderInfoTypeAMD](VkShaderInfoTypeAMD.html)

* 
`VK_AMD_SHADER_INFO_EXTENSION_NAME`

* 
`VK_AMD_SHADER_INFO_SPEC_VERSION`

This example extracts the register usage of a fragment shader within a
particular graphics pipeline:

extern VkDevice device;
extern VkPipeline gfxPipeline;

PFN_vkGetShaderInfoAMD pfnGetShaderInfoAMD = (PFN_vkGetShaderInfoAMD)vkGetDeviceProcAddr(
    device, "vkGetShaderInfoAMD");

VkShaderStatisticsInfoAMD statistics = {};

size_t dataSize = sizeof(statistics);

if (pfnGetShaderInfoAMD(device,
    gfxPipeline,
    VK_SHADER_STAGE_FRAGMENT_BIT,
    VK_SHADER_INFO_TYPE_STATISTICS_AMD,
    &dataSize,
    &statistics) == VK_SUCCESS)
{
    printf("VGPR usage: %d\n", statistics.resourceUsage.numUsedVgprs);
    printf("SGPR usage: %d\n", statistics.resourceUsage.numUsedSgprs);
}

The following example continues the previous example by subsequently
attempting to query and print shader disassembly about the fragment shader:

// Query disassembly size (if available)
if (pfnGetShaderInfoAMD(device,
    gfxPipeline,
    VK_SHADER_STAGE_FRAGMENT_BIT,
    VK_SHADER_INFO_TYPE_DISASSEMBLY_AMD,
    &dataSize,
    nullptr) == VK_SUCCESS)
{
    printf("Fragment shader disassembly:\n");

    void* disassembly = malloc(dataSize);

    // Query disassembly and print
    if (pfnGetShaderInfoAMD(device,
        gfxPipeline,
        VK_SHADER_STAGE_FRAGMENT_BIT,
        VK_SHADER_INFO_TYPE_DISASSEMBLY_AMD,
        &dataSize,
        disassembly) == VK_SUCCESS)
    {
        printf((char*)disassembly);
    }

    free(disassembly);
}

* 
Revision 1, 2017-10-09 (Jaakko Konttinen)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_AMD_shader_info).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
