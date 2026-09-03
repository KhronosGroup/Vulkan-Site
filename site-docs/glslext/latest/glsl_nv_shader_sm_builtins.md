# GLSL_NV_shader_sm_builtins

## Metadata

- **Component**: glslext
- **Version**: latest
- **URL**: /glslext/latest/glslext/nv/GLSL_NV_shader_sm_builtins.html

## Content

The original text file describing this extension as a set of diffs to the
OpenGL Shading Language Specification follows.

Name

    NV_shader_sm_builtins

Name Strings

    GL_NV_shader_sm_builtins

Contact

    Daniel Koch (dkoch 'at' nvidia.com), NVIDIA

Contributors

    Jeff Bolz, NVIDIA

Status

    Complete

Version

    Last Modified Date: 2019-05-17
    Revision: 1

Number

    N/A

Dependencies

    This extension can be applied to OpenGL GLSL versions 1.40
    (#version 140) and higher.

    This extension can be applied to OpenGL ES ESSL versions 3.10
    (#version 310) and higher.

    This extension is written against revision 7 of the OpenGL Shading Language
    version 4.50, dated May 9, 2017.

    This extension interacts with revision 36 of the GL_KHR_vulkan_glsl
    extension, dated February 13, 2017.

    This extension interacts with GL_NV_mesh_shader.

    This extension interacts with GL_NV_ray_tracing.

Overview

    This extension adds the functionality of NV_shader_thread_group
    that was not subsumed by KHR_shader_subgroup.

    In particular, this extension adds new shader inputs to query

       * the number of warps running on a SM (gl_WarpsPerSMNV),

       * the number of SMs on the GPU (gl_SMCountNV),

       * the warp id (gl_WarpIDNV), and

       * the SM id (gl_SMIDNV).

    Mapping to SPIR-V
    -----------------

    For informational purposes (non-specification), the following is an
    expected way for an implementation to map GLSL constructs to SPIR-V
    constructs:

        gl_WarpsPerSMNV -> WarpsPerSMNV decorated OpVariable
        gl_SMCountNV -> SMCountNV decorated OpVariable
        gl_WarpIDNV -> WarpIDNV decorated OpVariable
        gl_SMIDNV -> SMIDNV decorated OpVariable

Modifications to The OpenGL Shading Language Specification, Version 4.50
(Revision 7)

    Including the following line in a shader can be used to control the
    language features described in this extension:

      #extension GL_NV_shader_sm_builtins : 

    where  is as specified in section 3.3.

    New preprocessor #defines are added to the OpenGL Shading Language:

      #define GL_NV_shader_sm_builtins         1

    Modify Section 7.1, Built-in Languages Variable, p. 122

    (Add to the list of built-in variables for the compute, vertex,
     geometry, tessellation control, tessellation evaluation, fragment,
     mesh, task, ray generation, intersection, any-hit, closest-hit,
     miss, and callable shading languages)

        highp in uint gl_WarpsPerSMNV;
        highp in uint gl_SMCountNV;
        highp in uint gl_WarpIDNV;
        highp in uint gl_SMIDNV;

    The variable gl_WarpsPerSMNV holds the maximum number of warps executing
    on a SM.

    The variable gl_SMCountNV holds the number of SMs on the device.

    The variable gl_WarpIDNV holds the warp id of the executing invocation.
    This variable is in the range 0 to gl_WarpsPerSMNV-1.

    The variable gl_SMIDNV holds the SM id of the executing invocation.
    This variable is in the range 0 to gl_SMCountNV-1.

Dependencies on NV_mesh_shader

    If GL_NV_mesh_shader is not supported, ignore all references to mesh and
    task shaders.

Dependencies on NV_ray_tracing

    If GL_NV_ray_tracing is not supported, ignore all references to
    ray generation, intersection, any-hit, closest-hit, miss, and callable
    shaders.

Issues

    1) What functionality is provided by NV_shader_thread_group that is not
       already provided by other mechanisms?

    NV_shader_thread_group
    in uint gl_ThreadInWarpNV           in uint gl_SubgroupInvocationID (KHR_shader_subgroup_basic)
    in uint gl_Thread??MaskNV           in uvec4 gl_Subgroup??Mask (KHR_shader_subgroup_ballot)
    in bool gl_HelperThreadNV           in bool glHelperInvocation (GLSL 4.50, ESSL 3.10)
    in uint  gl_WarpIDNV;
