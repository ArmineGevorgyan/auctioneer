<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()['cache']->forget('spatie.permission.cache');

        Permission::create(['name' => 'view-product']);
        Permission::create(['name' => 'create-product']);
        Permission::create(['name' => 'edt-product']);
        Permission::create(['name' => 'delete-product']);
        Permission::create(['name' => 'create-bid']);

        $role = Role::create(['name' => 'admin']);
        $role->givePermissionTo(Permission::all());

        $role = Role::create(['name' => 'visitor']);
        $role->givePermissionTo(['view-product', 'create-bid']);
    }
}
